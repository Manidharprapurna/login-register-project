import express from "express";
import { uploadProduct } from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  buyProduct
} from "../controllers/productController.js";

const router = express.Router();


// ADMIN PRODUCT ROUTES

router.post(
  "/admin/products",
  authMiddleware,
  roleMiddleware("admin"),
  uploadProduct.single("image"),
  createProduct
);

router.put(
  "/admin/products/:id",
  authMiddleware,
  roleMiddleware("admin"),
  uploadProduct.single("image"),
  updateProduct
);

router.delete(
  "/admin/products/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteProduct
);


// USER PRODUCT ROUTES

router.get(
  "/products",
  authMiddleware,
  roleMiddleware("user"),
  getAllProducts
);

router.get(
  "/products/:id",
  authMiddleware,
  roleMiddleware("user"),
  getProductById
);

router.post(
  "/products/:id/buy",
  authMiddleware,
  roleMiddleware("user"),
  buyProduct
);

export default router;