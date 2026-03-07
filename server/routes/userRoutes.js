import express from "express";
import { uploadUser } from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", uploadUser.single("file"), registerUser);

router.post("/login", loginUser);

router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware("user"),
  getUserById
);

router.put(
  "/users/:id",
  authMiddleware,
  roleMiddleware("user"),
  uploadUser.single("file"),
  updateUser
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("user"),
  deleteUser
);

export default router;