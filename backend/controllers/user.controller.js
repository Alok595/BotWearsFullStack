import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    let userId = req.userId;

    let user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: `Get Current User not found Error ${error}` });
  }
};

export const getCurrentAdmin = async (req, res) => {
  try {
    let adminEmail = req.adminEmail;
    if (!adminEmail) {
      return res.status(404).json({ message: "Admin is not found" });
    }
    return res.status(201).json({ email: adminEmail, role: "admin" });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: `Get Current Admin not found Error ${error}` });
  }
};
