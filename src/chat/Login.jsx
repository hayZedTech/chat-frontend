import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginData=async(i)=>{
        i.preventDefault();
        try{
           const res = await axios.post("http://localhost:4000/login", {username, password});
            localStorage.setItem("user", JSON.stringify(res.data.user))
            navigate("/");
        }catch(err){
            alert(err.response?.data?.error)
        };
    };


  return (
    <>
    <h1>Login</h1>
   <form onSubmit={loginData}>
     <input type="text" value={username} onChange={(x)=>setUsername(x.target.value)} />
    <input type="password" value={password} onChange={(x)=>setPassword(x.target.value)} />
    <button type="submit">Login</button>
   </form>
   <Link to="/signup">Signup</Link>
    </>
    
  )
}
