import mongoose from "mongoose";
import argon2 from "argon2";
import User from "./models/User.js";
import connectDB from "./config/db.js";

const createAdmin = async () => {

  await connectDB();

  const hashedPassword = await argon2.hash("123456");

  const admin = new User({
    mobile: "7702860363",
    password: hashedPassword,
    role: "admin"
  });

  await admin.save();

  console.log("Admin created successfully");

  process.exit();
};

createAdmin();