import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

import cors from "cors";
import { connectToSocket } from "./src/socket/socketManager.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

  app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));
//   {
//   cors: {
//     origin: "http://localhost:3000", 
//     methods:["GET", "POST"],
//     credentials: true
//   }
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;



app.use("/api/v1/users", authRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
