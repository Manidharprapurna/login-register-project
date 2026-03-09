import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.webp";

const Navbar = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">

      <img
        src={logo}
        alt="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />

      <ul>

        {/* USER DASHBOARD */}
        {user && (
          <li onClick={() => navigate("/dashboard")}>
            DASHBOARD
          </li>
        )}

        {/* ADMIN DASHBOARD */}
        {admin && (
          <li onClick={() => navigate("/admin/dashboard")}>
            ADMIN DASHBOARD
          </li>
        )}

        <li onClick={() => navigate("/menu")}>MENU</li>
        <li onClick={() => navigate("/cart")}>CART</li>
        <li onClick={() => navigate("/location")}>LOCATION</li>
        <li onClick={() => navigate("/about")}>ABOUT</li>
        <li onClick={() => navigate("/contact")}>CONTACT</li>

      </ul>

      <div className="auth-buttons">

        {user || admin ? (
          <button className="btn1" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <>
            <button
              className="btn1"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>

            <button
              className="btn2"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default Navbar;