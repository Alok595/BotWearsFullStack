import express from "express";

import adminAuth from "../middlewares/adminAuth.js";
import {
  addProduct,
  listProduct,
  removeProduct,
} from "../controllers/product.controller.js";
import uplod from "../middlewares/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/addproduct",
  uplod.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list", listProduct);
productRouter.post("/delete/:id", adminAuth, removeProduct);

export default productRouter;

// now go to index.js to use authrouter
