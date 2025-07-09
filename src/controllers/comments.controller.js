import Comment from "../models/comments.model.js";

export const createComment = async (req, res) => {
  const { id, author, content, date } = req.body;

  if (id === null || isNaN(id)) {
    return res.status(400).json({ message: "Invalid id provided." });
  }

  try {
    const newComment = new Comment({ id, author, content, date });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ message: "Error saving comment." });
  }
};

export const getComments = async (req, res) => {
  const postId = req.params.id;

  try {
    const comments = await Comment.find({ id: postId });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments." });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  console.log(req.body.author.username);
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author !== req.body.author.username) {
      return res.status(403).json({ message: "Unauthorized to update this comment" });
    }

    comment.content = content;
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    console.error("Error updating the comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteComment = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    if (comment.author !== req.body.author.username) {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    await comment.deleteOne(); // Use deleteOne instead of remove
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting the comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
