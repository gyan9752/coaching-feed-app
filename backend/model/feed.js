
import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const Feed = mongoose.model("Feed", feedSchema);

export default Feed;