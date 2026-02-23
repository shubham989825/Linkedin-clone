import Post from "../models/Post.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.create({
      user: req.user._id,
      content,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts (feed)
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name profilePic")
      .populate("comments.user", "name profilePic")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like / Unlike a post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;
    if (post.likes.includes(userId)) {
      // Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comment on a post
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = { user: req.user._id, text };
    post.comments.push(comment);
    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate("user", "name profilePic")
      .populate("comments.user", "name profilePic");

    res.json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};