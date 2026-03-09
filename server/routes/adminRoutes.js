import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  adminLogin,
  getAllUsersAdmin,
  updateUserAdmin,
  deleteUserAdmin
} from "../controllers/adminController.js";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", adminLogin);

// GET ALL USERS
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsersAdmin
);

// UPDATE USER
router.put(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserAdmin
);

// DELETE USER
router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUserAdmin
);

export default router;