import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/profileDB", {
      serverSelectionTimeoutMS: 60000,
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("MongoDB Error:", err.message);
  }
};

export default connectDB;