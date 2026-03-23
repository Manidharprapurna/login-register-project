import User from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import fs from "fs";

const SECRET = "MY_SECRET_KEY";

// ADMIN LOGIN
export const adminLogin = async (req, res) => {

  try {

    const mobile = String(req.body.mobile).trim();
    const password = String(req.body.password).trim();

    if (!mobile || !password) {
      return res.status(400).json({ error: "Mobile and password required" });
    }

    const admin = await User.findOne({ mobile: mobile });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({ error: "Not authorized as admin" });
    }

    const match = await argon2.verify(admin.password, password);

    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...adminWithoutPassword } = admin._doc;

    res.json({
      status: "Admin login successful",
      token,
      admin: adminWithoutPassword
    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }
};

// GET ALL USERS
export const getAllUsersAdmin = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

};



// UPDATE USER BY ADMIN
export const updateUserAdmin = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.mobile) {
      user.mobile = String(req.body.mobile).trim();
    }

    if (req.body.password) {
      user.password = await argon2.hash(String(req.body.password).trim());
    }

    if (req.body.role) {
      user.role = req.body.role;
    }

    await user.save();

    const { password: _, ...userWithoutPassword } = user._doc;

    res.json(userWithoutPassword);

  } catch (err) {

    if (err.code === 11000) {
      return res.status(400).json({
        error: "Mobile number already exists"
      });
    }

    res.status(500).json({ error: err.message });

  }

};

// DELETE USER
export const deleteUserAdmin = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.file) {

      const filePath = `uploads/users/${user.file}`;

      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }

    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ status: "User deleted by admin" });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

};