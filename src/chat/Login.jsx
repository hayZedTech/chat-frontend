import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; 

export const Login = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginData = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Field cannot be empty!!!");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username,
        password,
      });

      const user = res.data.user;

      // 1️⃣ Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // 2️⃣ Update global state immediately (triggers re-render in App)
      setCurrentUser(user);

      // 3️⃣ Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={loginData} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>

          <button type="submit" className="login-button">Sign In</button>
        </form>

        <div className="login-footer">
          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
