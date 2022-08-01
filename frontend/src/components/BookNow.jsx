import React from "react";
import img5 from "../images/windows-p74ndnYWRY4-unsplash 1.png";
import WhiteButton from "./WhiteButton";
import "../index.css";
export default function BookNow() {
  return (
    <div className="header-container">
      <div className="left-side">
        <div className="header-left-side-components">
          <img src={img5} alt="" />
        </div>
      </div>
      <div className="right-side">
        <div className="right-display">
          <p className="p-style">
            Book a session with either a student or with a professional tutor
          </p>
          <div className="white-btn">
            <WhiteButton className="btn" content={"Book now"}></WhiteButton>
          </div>
        </div>
      </div>
    </div>
  );
}
