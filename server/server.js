import express from "express";
import cors from "cors";  
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

const app = express();
const port = 3000;

app.use(cors());   

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

connectDB();

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});