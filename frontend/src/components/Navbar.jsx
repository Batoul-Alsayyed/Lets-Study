import React from "react";
import "../index.css";
import logo from "../images/logo/logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="left-side">
          <div className="left-side-components">
            <img src={logo} alt="logo" />
            <p>Lets Study</p>
          </div>
        </div>
        <div className="right-side">
          <div className="right-side-components">
            <a href="/home">Home</a>
            <a href="/Signup">Register</a>
            <a href="/Signin">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
