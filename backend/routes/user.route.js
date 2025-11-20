import express from "express";
import {
  getCurrentAdmin,
  getCurrentUser,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import adminAuth from "../middlewares/adminAuth.js";

const userRouter = express.Router();

userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.get("/getcurrentadmin", adminAuth, getCurrentAdmin);

export default userRouter;

// now go to index.js to use authrouter
