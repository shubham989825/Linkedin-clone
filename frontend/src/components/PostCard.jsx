import { useState } from "react";
import API from "../services/api";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");

  // 🔥 Like / Unlike
  const handleLike = async () => {
    try {
      const { data } = await API.put(`/posts/${post._id}/like`);
      setLikes(data.likes);
    } catch (error) {
      console.log(error);
    }
  };

  // 💬 Add Comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const { data } = await API.post(
        `/posts/${post._id}/comment`,
        { text: commentText }
      );

      setComments(data.comments);
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-user">{post.user.name}</div>

      <div className="post-content">{post.content}</div>

      <div className="post-time">
        {new Date(post.createdAt).toLocaleString()}
      </div>

      {/* ❤️ Like Section */}
      <div className="post-actions">
        <button onClick={handleLike}>
          👍 Like ({likes.length})
        </button>
      </div>

      {/* 💬 Comments Section */}
      <div className="comments-section">
        <form onSubmit={handleComment}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </form>

        {comments.length > 0 &&
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.user?.name || "User"}:</strong> {comment.text}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostCard;