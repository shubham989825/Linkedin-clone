import express from "express";
import { registerUser, loginUser, getProfile, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Get all users
router.get("/users", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a connection request
router.post("/connections/request/:id", protect, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicate requests
    if (
      targetUser.connectionRequests.includes(currentUser._id) ||
      targetUser.connections.includes(currentUser._id)
    ) {
      return res.status(400).json({ message: "Request already sent or already connected" });
    }

    targetUser.connectionRequests.push(currentUser._id);
    await targetUser.save();

    res.json({ message: "Connection request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;