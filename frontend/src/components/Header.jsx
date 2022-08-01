import React from "react";
import Navbar from "../components/Navbar";
import "../index.css";
import header from "../images/header.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();

  const studyOnClick = (e) => {
    e.preventDefault();
    navigate("/Signup");
  };

  const proOnClick = (e) => {
    e.preventDefault();
    navigate("/Signup");
  };
  return (
    <div>
      <Navbar />
      <div className="header-container">
        <div className="left-side">
          <div className="header-left-side-components">
            <p className="header-p">First Online Study Platform</p>
            <p className="start-p">
              Start your study journey with students just like you or with a
              professional tutor.
            </p>
            <div className="buttons-styling">
              <button className="button1" onClick={proOnClick}>
                Join as a pro member
              </button>
              <button className="button2" onClick={studyOnClick}>
                Study For Free
              </button>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="header-right-side-components">
            <img src={header} />
          </div>
        </div>
      </div>
    </div>
  );
}
