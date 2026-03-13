import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {

  try {

    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order items required" });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const quantity = item.quantity || 1;

      totalPrice += product.price * quantity;

      orderItems.push({
        product: product._id,
        quantity,
        price: product.price
      });

    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice
    });

    res.status(201).json({
      status: "Order placed",
      order
    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

};



export const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({ user: req.user.id })
      .populate("items.product", "title price image")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

};



export const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user", "mobile")
      .populate("items.product", "title price")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

};



export const updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = req.body.status;

    await order.save();

    res.json({
      status: "Order updated",
      order
    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

};