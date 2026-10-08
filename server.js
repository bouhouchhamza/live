import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/auth.js";
import middleware from "./middlewars/auth.js";
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connection is okey");
  })
  .catch((error) => {
    console.log("connection is failed due to:", error);
  });
app.use(express.json());
app.use("/", router);
const PORT = process.env.PORT || 3000;
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "server is ON",
  });
});
import fs from "node:fs/promises";
app.get("/me", middleware,(req, res) => {
  return res.json(req.user)
});
// app.listen()
app.listen(PORT, () => {
  console.log("server is running", ` on port ${PORT}`);
});
