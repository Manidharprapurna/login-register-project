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


// MENU ROUTES (ADMIN + USER)

router.get(
  "/products",
  getAllProducts
);

router.get(
  "/products/:id",
  getProductById
);
// USER BUY ROUTE
router.post(
  "/products/:id/buy",
  authMiddleware,
  roleMiddleware("user"),
  buyProduct
);

export default router;