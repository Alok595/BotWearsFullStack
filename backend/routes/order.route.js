import express from "express";
import {
  AllOrders,
  placeOrder,
  placeOrderRazorpay,
  updateStatus,
  userOrder,
} from "../controllers/order.controller.js";
import isAuth from "../middlewares/isAuth.js";
import adminAuth from "../middlewares/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder", isAuth, placeOrder);
orderRouter.post("/placeorderbyrazorpay", isAuth, placeOrderRazorpay);

orderRouter.post("/userorder", isAuth, userOrder);
//for admn
orderRouter.post("/list", adminAuth, AllOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
