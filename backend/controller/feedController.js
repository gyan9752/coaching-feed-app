

import Feed from "../model/Feed.js";
import { getRedis } from "../config/redis.js";
import { getIO } from "../sockets/socket.js";

export const getFeeds = async (req, res) => {
  try {
    const redis = getRedis();

    const cached = await redis.get("feeds");

    if (cached) {
      return res.json({
        success: true,
        source: "redis",
        feeds: JSON.parse(cached),
      });
    }

    const feeds = await Feed.find().sort({ createdAt: -1 });

    await redis.set("feeds", JSON.stringify(feeds), { EX: 60 });

    res.json({ success: true, feeds, source: "db" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createFeed = async (req, res) => {
  try {
    const redis = getRedis();
    const io = getIO();

    const feed = await Feed.create(req.body);

    await redis.del("feeds");

    io.emit("newFeed", feed);

    res.status(201).json({ success: true, feed });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};