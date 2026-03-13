import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("user"),
  createOrder
);

router.get(
  "/my-orders", 
  authMiddleware, 
  roleMiddleware("user"), 
  getMyOrders
);

router.get(
  "/", 
  authMiddleware, 
  roleMiddleware("admin"), 
  getAllOrders
);

router.patch(
  "/:id", 
  authMiddleware, 
  roleMiddleware("admin"), 
  updateOrderStatus
);

export default router;