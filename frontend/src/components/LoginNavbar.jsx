import React from 'react'
import "../index.css";
import logo from '../images/logo/logo.png';
import account from '../images/Account.png';
export default function LoginNavbar() {
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
                    <p>Welcome Username</p>
                    <img src={account} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
