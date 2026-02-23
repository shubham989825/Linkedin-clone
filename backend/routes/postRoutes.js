import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createPost, getPosts, toggleLike, addComment } from "../controllers/postController.js";

const router = express.Router();

// Routes
router.post("/", protect, createPost);             // Create post
router.get("/", protect, getPosts);               // Get feed
router.put("/:id/like", protect, toggleLike);     // Like/unlike post
router.post("/:id/comment", protect, addComment); // Add comment

export default router;