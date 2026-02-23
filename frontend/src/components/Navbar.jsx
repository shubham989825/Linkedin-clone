import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
   const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
     <div className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>
        LinkedIn Clone
      </h2>

      {token && (
        <div className="nav-links">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
          <button onClick={() => navigate("/connections")}>Connections</button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {!token && (
        <div className="nav-links">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;