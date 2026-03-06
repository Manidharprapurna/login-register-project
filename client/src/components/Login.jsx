import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedMobile = mobile.trim();
    const trimmedPassword = password.trim();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          mobile: trimmedMobile,
          password: trimmedPassword
        }
      );

      alert("Login Successful");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data.user)
      );
       navigate("/dashboard");
      console.log(response.data);

    } catch (error) {
      console.error(error.response?.data);
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
