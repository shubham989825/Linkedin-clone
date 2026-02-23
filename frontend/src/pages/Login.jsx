import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email:"",
        password:"",
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await API.post("/auth/login", form);

            localStorage.setItem("token", data.token);

            navigate("/");
        } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);
  alert(JSON.stringify(error.response?.data));
}
    };
    return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;