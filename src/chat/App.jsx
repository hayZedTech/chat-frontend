import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./Signup";
import {Login} from "./Login";
import { Dashboard } from "./Dashboard";


export const App = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
        <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" /> } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  )
}
