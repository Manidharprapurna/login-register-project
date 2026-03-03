import React, { useState } from "react";
import axios from "axios";

const Register = () => {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedMobile = mobile.trim();
    const trimmedPassword = password.trim();
    const trimmedRePassword = rePassword.trim();

    if (trimmedPassword !== trimmedRePassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Fake API call
      await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        {
          username: trimmedMobile,
          password: trimmedPassword
        }
      );

      // Get existing users
      const existingUsers =
        JSON.parse(localStorage.getItem("users")) || [];

      // Check duplicate mobile
      const userExists = existingUsers.find(
        (user) => user.mobile === trimmedMobile
      );

      if (userExists) {
        alert("user already registered");
        return;
      }

      // Add new user
      existingUsers.push({
        mobile: trimmedMobile,
        password: trimmedPassword
      });

      // Save back to localStorage
      localStorage.setItem(
        "users",
        JSON.stringify(existingUsers)
      );
       console.log("Saved Users:", existingUsers);

      alert("Registration Successful");

      // Clear input fields
      setMobile("");
      setPassword("");
      setRePassword("");

    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
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

        <input
          type="password"
          placeholder="Re-enter Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
        />

        <button type="submit" className="btn1">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;