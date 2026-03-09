import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {

    e.preventDefault();

    const trimmedMobile = mobile.trim();
    const trimmedPassword = password.trim();

    try {

      console.log("Sending admin login request");

      const response = await axios.post(
        "http://localhost:3000/api/admin/login",
        {
          mobile: trimmedMobile,
          password: trimmedPassword
        }
      );

      console.log("Admin login successful", response.data);

      alert("Admin Login Successful");

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save admin details
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      // Redirect to admin dashboard
      navigate("/admin/dashboard");

    } catch (error) {

      console.log("Admin login failed:", error);

      alert(
        error.response?.data?.error || "Admin Login Failed"
      );

    }

    setMobile("");
    setPassword("");

  };

  return (

    <div className="login-container">

      <h2>Admin Login</h2>

      <form onSubmit={handleAdminLogin}>

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
          Admin Login
        </button>

      </form>

    </div>

  );

};

export default AdminLogin;