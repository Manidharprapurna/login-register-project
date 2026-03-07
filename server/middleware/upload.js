import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// ensure folders exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

if (!fs.existsSync("uploads/users")) {
  fs.mkdirSync("uploads/users");
}

if (!fs.existsSync("uploads/products")) {
  fs.mkdirSync("uploads/products");
}


// USER IMAGE STORAGE
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  }
});


// PRODUCT IMAGE STORAGE
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  }
});


export const uploadUser = multer({
  storage: userStorage
});

export const uploadProduct = multer({
  storage: productStorage
});