import React, { useState, useEffect } from "react";
import RatePopup from "./RatePopup";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import LoginNavbar from "../components/LoginNavbar";
import profile from "../images/Frame 4.png";
import { RiStarFill } from "react-icons/ri";
import { BsChatQuote } from "react-icons/bs";

export default function StudentProfile() {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const [isOpen, setIsOpen] = useState(false);

  let { id } = useParams();
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const rateClicked = (e) => {
    e.preventDefault();
    togglePopup();
  };
  const submit_rate = (e) => {
    e.preventDefault();
    togglePopup();
  };

  return (
    <div>
      <LoginNavbar />

      {isOpen && (
        <RatePopup
          content={
            <div className="pop-up">
              <h1 className="rate-text">Rate this student</h1>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={60}
                activeColor="#ffd700"
              />
              <div>
                <button className="submit-pop-up" onClick={submit_rate}>
                  Submit
                </button>
              </div>
            </div>
          }
          handleClose={togglePopup}
        />
      )}

      <p className="student-profile-title">Student profile</p>
      <div className="student-profile">
        <div className="student-profile-content">
          <div>Name: Student A</div>
          <div>Age: 18 years old</div>
          <div>
            Rating:
            <span className="rate-stars" id="icons">
              <RiStarFill className="star" />
              <RiStarFill className="star" />
              <RiStarFill className="star" />
              <RiStarFill className="star" />
            </span>
          </div>
          <div>Location: Beirut, Lebanon</div>
          <div>
            Email: Student@gmail.com <BsChatQuote />
          </div>
        </div>
        <div className="student-profile-content">
          <img src={profile} className="student-profile-img" />
        </div>
      </div>
      <div className="centered">
        <button className="rate-btn" onClick={rateClicked}>
          Rate this student
        </button>
      </div>
    </div>
  );
}
