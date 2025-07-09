

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  content: { type: String, required: true },
  tags: { type: String, required: false },
  coverimg: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  approved: { type: Boolean, required: true, default: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  authorEmail: { type: String, required: true }
});

const Posts = mongoose.model("Posts", PostSchema);


export default Posts;