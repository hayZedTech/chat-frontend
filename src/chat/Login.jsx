import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; 

export const Login = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 Spinner state
  const navigate = useNavigate();

  const loginData = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Field cannot be empty!!!");
      return;
    }

    setLoading(true); // 🔹 Start spinner

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username,
        password,
      });

      const user = res.data.user;

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Update global state
      setCurrentUser(user);

      // Navigate
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false); // 🔹 Stop spinner
    }
  };

  return (
    <div className="login-container">
      {/* 🔹 Spinner Overlay */}
      {loading && (
        <div className="spinner-overlay">
          <div className="custom-spinner"></div>
        </div>
      )}

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

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
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
