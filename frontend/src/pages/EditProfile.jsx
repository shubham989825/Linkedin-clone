import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", bio: "", skills: [] });
  const [skillsInput, setSkillsInput] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/auth/profile");
        setUser(data);
        setSkillsInput(data.skills.join(", "));
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = skillsInput.split(",").map((s) => s.trim());
      const { data } = await API.put("/auth/profile", {
        ...user,
        skills: skillsArray,
      });
      alert("Profile updated!");
      setUser(data);
    } catch (error) {
      console.log("Update error:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />

          <label>Bio:</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            rows={3}
          />

          <label>Skills (comma separated):</label>
          <input
            type="text"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
          />

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;