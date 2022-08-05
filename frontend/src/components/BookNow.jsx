import React from "react";
import img5 from "../images/windows-p74ndnYWRY4-unsplash 1.png";
import WhiteButton from "./WhiteButton";
import "../index.css";
import { useNavigate } from "react-router-dom";
export default function BookNow() {
  let navigate = useNavigate();

  const bookHandler = () => {
    navigate("/Signup");
  };
  return (
    <div className="header-container">
      <div className="left-side">
        <div className="header-left-side-components">
          <img src={img5} alt="" />
        </div>
      </div>
      <div className="right-side">
        <div className="right-display4">
          <p className="p-style">
            Book a session with either a student or with a professional tutor
          </p>
          <div className="white-btn">
            <button className="button2 btn" onClick={bookHandler}>
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
