//step1

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
dotenv.config();

let app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://botwearsfullstack-frontendone.onrender.com", "https://botwearsfullstack-frontendtwo.onrender.com"],
    credentials: true,
  })
);

let port = process.env.PORT || 6000;

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`MonoDB Connected at Port:${port}`);
  connectDB();
});
