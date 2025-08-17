import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signupData = async (e) => {
        e.preventDefault();
        try {
            console.log("Signup request to:", import.meta.env.VITE_API_URL);

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/signup`,
                { username, password }
            );

            console.log(res.data); 
            // alert(res.data.message); // Show success message
            alert("Signed up succesfully!")
            navigate("/login"); // Redirect to login page
        } catch (err) {
            console.error("Signup error:", err);
            alert(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={signupData}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Signup</button>
            </form>
            <Link to="/login">Login</Link>
        </>
    );
};
