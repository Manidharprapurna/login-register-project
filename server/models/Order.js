import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1
      },
      price: Number
    }
  ],

  totalPrice: Number,

  status: {
    type: String,
    enum: ["pending", "preparing", "delivered"],
    default: "pending"
  }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;