import User from "../models/User.js";
import argon2 from "argon2";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1
    });

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = newUser._doc;
    res.status(201).json(userWithoutPassword);

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    res.status(400).json({ error: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(404).json({ error: "User not found" });

    const match = await argon2.verify(user.password, req.body.password);

    if (!match)
      return res.status(401).json({ error: "Invalid password" });

    const { password, ...userWithoutPassword } = user._doc;
    res.json({ status: "Login successful", user: userWithoutPassword });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user)
      return res.status(404).json({ error: "User not found" });

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ error: "User not found" });

    if (req.body.password) {
      user.password = await argon2.hash(req.body.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1
      });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    await user.save();

    const { password, ...userWithoutPassword } = user._doc;
    res.json(userWithoutPassword);

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    res.status(500).json({ error: err.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ error: "User not found" });

    await User.findByIdAndDelete(req.params.id);

    res.json({ status: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};