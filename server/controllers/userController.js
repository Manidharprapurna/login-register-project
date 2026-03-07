import User from "../models/User.js";
import Product from "../models/Product.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import fs from "fs";

const SECRET = "MY_SECRET_KEY";


// REGISTER
export const registerUser = async (req, res) => {

console.log("user registration", req.body);

  try {

    const mobile = String(req.body.mobile).trim();
    const password = String(req.body.password).trim();

    if (!mobile || !password) {

      if (req.file) {
        const filePath = `uploads/${req.file.filename}`;
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      }

      return res.status(400).json({
        error: "Mobile and password are required"
      });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({
      mobile,
      password: hashedPassword,
      role: "user",
      file: req.file ? req.file.filename : null
    });

    const { password: _, ...userWithoutPassword } = newUser._doc;

    res.status(201).json({
      status: "Registration successful",
      user: userWithoutPassword
    });

  } catch (err) {

    if (req.file) {
      const filePath = `uploads/${req.file.filename}`;
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    }

    if (err.code === 11000) {
      return res.status(400).json({
        error: "Mobile number already exists"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
};



// LOGIN
export const loginUser = async (req, res) => {

  try {

    const mobile = String(req.body.mobile).trim();
    const password = String(req.body.password).trim();

    if (!mobile || !password) {
      return res.status(400).json({
        error: "Mobile and password required"
      });
    }

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    if (user.role !== "user") {
      return res.status(403).json({
        error: "Not authorized as user"
      });
    }

    const match = await argon2.verify(user.password, password);

    if (!match) {
      return res.status(401).json({
        error: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...userWithoutPassword } = user._doc;

    res.json({
      status: "Login successful",
      token,
      user: userWithoutPassword
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};



// GET USER BY ID (ONLY THEIR OWN ACCOUNT)
export const getUserById = async (req, res) => {

  try {

    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        error: "Access denied"
      });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json(user);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};



// UPDATE USER (ONLY OWN ACCOUNT)
export const updateUser = async (req, res) => {

  try {

    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        error: "Access denied"
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {

      if (req.file) {
        const filePath = `uploads/${req.file.filename}`;
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      }

      return res.status(404).json({
        error: "User not found"
      });
    }

    if (req.file) {

      if (user.file) {

        const oldFile = `uploads/users/${user.file}`;

        if (fs.existsSync(oldFile)) {
          await fs.promises.unlink(oldFile);
        }

      }

      user.file = req.file.filename;
    }

    if (req.body.password) {
      user.password = await argon2.hash(String(req.body.password).trim());
    }

    if (req.body.mobile) {
      user.mobile = String(req.body.mobile).trim();
    }

    await user.save();

    const { password: _, ...userWithoutPassword } = user._doc;

    res.json(userWithoutPassword);

  } catch (err) {

    if (req.file) {
      const filePath = `uploads/${req.file.filename}`;
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    }

    if (err.code === 11000) {
      return res.status(400).json({
        error: "Mobile number already exists"
      });
    }

    res.status(500).json({
      error: err.message
    });

  }

};



// DELETE USER (ONLY OWN ACCOUNT)
export const deleteUser = async (req, res) => {

  try {

    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        error: "Access denied"
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    if (user.file) {

      const filePath = `uploads/users/${user.file}`;

      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }

    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      status: "User deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};



// GET ALL PRODUCTS (FOR USERS)
export const getAllProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};