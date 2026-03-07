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

router.post("/admin/login", adminLogin);

router.get(
  "/admin/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsersAdmin
);

router.put(
  "/admin/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserAdmin
);

router.delete(
  "/admin/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUserAdmin
);

export default router;