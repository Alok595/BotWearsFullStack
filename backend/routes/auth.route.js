import express from "express";
import {
  adminLogin,
  googleLogin,
  login,
  logOut,
  register,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logOut);
authRouter.post("/googlelogin", googleLogin);
authRouter.post("/adminlogin", adminLogin);

export default authRouter;

// now go to index.js to use authrouter
