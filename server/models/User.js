import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  file: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;