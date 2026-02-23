import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const { data: userData } = await API.get("/auth/profile");
        setUser(userData);

        const { data: postsData } = await API.get("/posts");
        setPosts(postsData.reverse());

        setLoading(false);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfileAndPosts();
  }, [navigate]);

  const handleNewPost = (post) => {
    setPosts([post, ...posts]);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return null; // shouldn't happen, but safe check
  }

  return (
  <>
    <Navbar />

    <div className="main-layout">
      <div className="feed-container">

        {/* Welcome Card */}
        <div className="profile-card">
  <div className="profile-header">
    <div className="avatar-circle">
      {user.name.charAt(0).toUpperCase()}
    </div>

    <div className="profile-info">
      <h2>{user.name}</h2>
      <p className="profile-email">{user.email}</p>
    </div>
  </div>

  <p className="profile-bio">
    {user.bio || "No bio added"}
  </p>
</div>

        {/* Create Post Card */}
        <div className="create-post-card">
          <CreatePost onNewPost={handleNewPost} />
        </div>

        {/* Posts Feed */}
        {posts.length === 0 ? (
          <div className="empty-feed">
            <p>No posts yet.</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        )}

      </div>
    </div>
  </>
);
};

export default Home;