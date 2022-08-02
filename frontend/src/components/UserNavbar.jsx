import React, { useState, useEffect } from "react";
import "../index.css";
import logo from "../images/logo/logo.png";
import account from "../images/Account.png";
import axios from "axios";

export default function USerNavbar() {
  const [path, setPath] = useState(0);
  const [name, setName] = useState(0);

  useEffect(() => {
    //since we have the access token in local storage
    //lets use it to retreive user info
    // console.log(localStorage.getItem("access_token"));
    let access_token = localStorage.getItem("access_token");
    axios
      .get(`http://127.0.0.1:8000/api/user/user-profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setName(res.data.name);
        setPath("/students/" + res.data.id);
      });
  });
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="left-side">
          <div className="left-side-components">
            <a href="/home">
              <img src={logo} alt="logo" />
            </a>
            <p>Lets Study</p>
          </div>
        </div>
        <div className="right-side">
          <div className="right-side-components">
            <a href={path}>Study Now</a>
            <p>Welcome {name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
