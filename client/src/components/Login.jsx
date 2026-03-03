import React, { useState } from "react";

const Login = () => {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const trimmedMobile = mobile.trim();
    const trimmedPassword = password.trim();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(
      (user) =>
        user.mobile === trimmedMobile &&
        user.password === trimmedPassword
    );

    if (userFound) {
      alert("Login Successful");

      // Save logged in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(userFound)
      );

    } else {
      alert("Invalid Credentials ");
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