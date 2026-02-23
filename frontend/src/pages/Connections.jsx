import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Connections = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get current user profile
        const { data: userData } = await API.get("/auth/profile");
        setCurrentUser(userData);

        // 2️⃣ Get all other users
        const { data: allUsers } = await API.get("/users");
        // Exclude current user
        setUsers(allUsers.filter((u) => u._id !== userData._id));
        setLoading(false);
      } catch (error) {
        console.log("Fetch error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  // Send connection request
  const handleConnect = async (userId) => {
    try {
      await API.post(`/connections/request/${userId}`);
      alert("Connection request sent!");
    } catch (error) {
      console.log("Connection error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to send request");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />
      <div className="connections-container">
        <h2>Connect with others</h2>
        {users.length === 0 ? (
          <p>No other users found.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} className="connection-card">
              <p><strong>{user.name}</strong></p>
              <p>{user.bio || "No bio"}</p>
              <p>Skills: {user.skills.length > 0 ? user.skills.join(", ") : "None"}</p>
              <button onClick={() => handleConnect(user._id)}>Connect</button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Connections;