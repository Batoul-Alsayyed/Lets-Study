import React from "react";
import "../index.css";
import logo from '../images/logo/logo.png';
export default function Navbar() {
  return (
    <div className="navbar">
        <div className="navbar-container">
            <div className="left-side">
                <div className="left-side-components">
                    <img src={logo} alt="logo"/>
                    <p>Lets Study</p>
                </div>
            </div>
            <div className="right-side">
                <div className="right-side-components">
                    <p>Home</p>
                    <p>Register</p>
                    <p>Login</p>
                </div>
            </div>
        </div>
    </div>
  );
}
