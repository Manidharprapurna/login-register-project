import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");

    const trimmedMobile = mobile.trim();
    const trimmedPassword = password.trim();

    try {
      console.log("Sending login request to backend")
      const response = await axios.post(
        "http://localhost:3000/login",
  
        {
          mobile: trimmedMobile,
          password: trimmedPassword
        }
      );
      console.log("login successful")
      alert("Login Successful");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data.user)
      );
       navigate("/dashboard");
      console.log({response});

    } catch (error) {
      console.log("login failed")
      alert(error.response?.data?.error || "Login Failed");
    }

    setMobile("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="tel"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn1">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
