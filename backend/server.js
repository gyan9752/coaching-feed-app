
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";

import connectDB from "./config/db.js";
import { initRedis } from "./config/redis.js";
import { initSocket } from "./sockets/socket.js";

import feedRoutes from "./routes/feedRoutes.js";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/feed", feedRoutes);

const start = async () => {
  try {
    await connectDB();
    await initRedis();

    const io = await initSocket(server);

    app.use((req, res, next) => {
      req.io = io;
      next();
    });

    server.listen(5000, () => {
      console.log("🚀 Server running on 5000");
    });
  } catch (err) {
    console.log(err);
  }
};

start();