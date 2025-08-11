import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signupData=async(i)=>{
        i.preventDefault();
        try{
             await axios.post("http://localhost:4000/signup", {username, password});
            navigate("/");
        }catch(err){
            alert(err.response?.data?.error)
        };
    };


  return (
    <>
    <h1>Signup</h1>
   <form onSubmit={signupData}>
     <input type="text" value={username} onChange={(x)=>setUsername(x.target.value)} />
    <input type="password" value={password} onChange={(x)=>setPassword(x.target.value)} />
    <button>Signup</button>
   </form>
   <Link to="/login">Login</Link>
    </>
    
  )
}
