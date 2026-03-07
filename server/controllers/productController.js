import Product from "../models/Product.js";
import fs from "fs";

// CREATE PRODUCT (ADMIN ONLY)
export const createProduct = async (req, res) => {

  try {

    const { title, description, price } = req.body;

    if (!title || !price) {

      if (req.file) {
        const filePath = `uploads/products/${req.file.filename}`;
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      }

      return res.status(400).json({
        error: "Title and price required"
      });

    }

    const product = await Product.create({

      title,
      description,
      price,
      image: req.file ? req.file.filename : null,
      createdBy: req.user.id

    });

    res.status(201).json({
      status: "Product created",
      product
    });

  } catch (err) {

    if (req.file) {
      const filePath = `uploads/products/${req.file.filename}`;
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    }

    res.status(500).json({ error: err.message });

  }

};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

};

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

};

// UPDATE PRODUCT (ADMIN)
export const updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {

      if (req.file) {
        const filePath = `uploads/products/${req.file.filename}`;
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      }

      return res.status(404).json({
        error: "Product not found"
      });

    }

    if (req.file) {

      if (product.image) {

        const oldFile = `uploads/${product.image}`;

        if (fs.existsSync(oldFile)) {
          await fs.promises.unlink(oldFile);
        }

      }

      product.image = req.file.filename;

    }

    if (req.body.title) product.title = req.body.title;
    if (req.body.description) product.description = req.body.description;
    if (req.body.price) product.price = req.body.price;

    await product.save();

    res.json(product);

  } catch (err) {

    if (req.file) {
      const filePath = `uploads/products/${req.file.filename}`;
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    }

    res.status(500).json({ error: err.message });

  }

};

// DELETE PRODUCT (ADMIN)
export const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    if (product.image) {

      const filePath = `uploads/products/${product.image}`;

      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }

    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      status: "Product deleted"
    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

};

// BUY PRODUCT (USER)
export const buyProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json({
      status: "Product purchased successfully",
      product,
      buyer: req.user.id
    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

};