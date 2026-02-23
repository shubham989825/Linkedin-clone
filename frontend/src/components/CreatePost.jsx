import { useState } from "react";
import API from "../services/api";

const CreatePost = ({ onNewPost }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return alert("Post cannot be empty");

    try {
      const { data } = await API.post("/posts", { content });
      onNewPost(data);
      setContent("");
    } catch (error) {
      console.log("Error creating post:", error);
      alert("Failed to create post");
    }
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <textarea
        className="post-textarea"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="post-btn" type="submit">
        Post
      </button>
    </form>
  );
};

export default CreatePost;