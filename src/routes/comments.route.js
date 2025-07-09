import express from "express";
import { createComment, getComments, updateComment, deleteComment } from "../controllers/comments.controller.js";

const router = express.Router();

router.post("/comments", createComment);
router.get("/comments/:id", getComments);
router.put("/comments/:id", updateComment);
router.delete("/comments/:id", deleteComment);

export default router;