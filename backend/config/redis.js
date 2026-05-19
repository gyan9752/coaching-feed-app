
import { createClient } from "redis";

let client;

export const initRedis = async () => {
  client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on("error", (err) => {
    console.log("Redis Error:", err.message);
  });

  await client.connect();
  console.log("Redis Connected");

  return client;
};

export const getRedis = () => {
  if (!client) throw new Error("Redis not initialized");
  return client;
};