import User from "../models/User.js";
import argon2 from "argon2";
import fs from "fs";

//REGISTER
export const registerUser = async (req, res) => {

  console.log("REQ.BODY:", req.body);
  console.log("REQ.FILE:", req.file);

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

    const existingUser = await User.findOne({ mobile });

    if (existingUser) {

      if (req.file) {
        const filePath = `uploads/${req.file.filename}`;
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      }

      return res.status(400).json({
        error: "Mobile number already exists"
      });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({
      mobile: mobile,
      password: hashedPassword,
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

//LOGIN
export const loginUser = async (req, res) => {
  try {
    const mobile = String(req.body.mobile).trim();
    const password = String(req.body.password).trim();

    if (!mobile || !password) {
      return res.status(400).json({ 
      error: "Mobile and password are required" });
    }

    console.log("Login attempt mobile:", mobile);

    const user = await User.findOne({ mobile: mobile });

    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ 
        error: "User not found" 
      });
    }

    const match = await argon2.verify(user.password, password);

    if (!match) {
      return res.status(401).json({ 
        error: "Invalid password" 
      });
    }

    const { password: _, ...userWithoutPassword } = user._doc;

    res.json({
      status: "Login successful",
      user: userWithoutPassword
    });
  } 

  catch (err) {
    res.status(500).json({ 
      error: err.message 
    });
  }
};

//GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ 
      error: err.message 
    });
  }
};

//GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ 
        error: "User not found" 
      });
    }

    res.json(user);

  } 
  catch (err) {
    res.status(500).json({ 
      error: err.message 
    });
  }
};

//UPDATE USER
export const updateUser = async (req, res) => {

  try {

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

        const oldFile = `uploads/${user.file}`;

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

  } 
  catch (err) {

    if (req.file) {
      const filePath = `uploads/${req.file.filename}`;
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    }

    if (err.code === 11000) {
      console.log({err})
      return res.status(400).json({ 
        error: "Mobile number already exists" 
      });
    }

    res.status(500).json({
    error: err.message 
  });
  }
};

//DELETE USER
export const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.file) {

      const filePath = `uploads/${user.file}`;

      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ status: "User deleted successfully" });

  } 
  catch (err) {

  res.status(500).json({ error: err.message });

  }
};