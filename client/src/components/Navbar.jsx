import React from 'react'
import { useNavigate } from "react-router-dom"
import logo from "../images/logo.webp";

const Navbar = () => {

  const navigate = useNavigate(); 

  return (
    <div className="navbar">
      <img 
        src={logo} 
        alt="logo" 
        onClick={() => navigate("/")} 
        style={{ cursor: "pointer" }}
        
      />

      <ul>
        <li>MENU</li>
        <li>CART</li>
        <li>LOCATION</li>
        <li>ABOUT</li>
        <li>CONTACT</li>
      </ul>

      <div className="auth-buttons">
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
        
      </div>

    </div>
  )
}

export default Navbar
