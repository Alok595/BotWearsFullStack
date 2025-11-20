//setp 5

import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genrateToken, genrateTokenAdmin } from "../config/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter Valid Email " });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password Must Be 8 charters " });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User Already Exits " });
    }

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // now inside config create a token.js

    let token = genrateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("Register Error");
    return res.status(500).json({ message: `Register Error ${error}` });
  }
};

//step 8

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not Exits , Register First " });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    let token = genrateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
     secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("Login Error");
    return res.status(500).json({ message: `Login Error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Done Succesful" });
  } catch (error) {
    return res.status(500).json({ message: "Logout Done Succesful" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    let token = genrateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log("Google Login Error");
    return res.status(500).json({ message: `Google Login Error ${error}` });
  }
};

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let token = await genrateTokenAdmin(email);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
      sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json(token);
    }
    return res.status(400).json({ message: "Invalid Credential" });
  } catch (error) {
    console.log("Admin Login Error");
    return res.status(400).json({ message: `Admin Login Error ${error}` });
  }
};
