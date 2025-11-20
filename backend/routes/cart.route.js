import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/get", isAuth, getUserCart);
cartRouter.post("/add", isAuth, addToCart);
cartRouter.post("/update", isAuth, updateCart);

export default cartRouter;

// now go to index.js to use authrouter
