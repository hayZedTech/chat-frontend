import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginData = async (e) => {
    e.preventDefault();
    try {
      console.log("Login request to:", import.meta.env.VITE_API_URL);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { username, password });

      console.log("Response:", res.data);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        alert("Login failed: no user returned");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginData}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Signup</Link>
    </>
  );
};
