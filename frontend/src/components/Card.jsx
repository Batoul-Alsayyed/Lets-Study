import React from "react";
import "../index.css";
import student from "../images/asian-college-student-400x400 2.png";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
export default function Card() {
  return (
    <div className="card">
      <img src={student} alt="" className="card-img" />
      <div>
        <p>Student name</p>
        <span className="rate">1.2</span>
        <FaStar className="star-icon"></FaStar>
      </div>
      <div className="location-div">
        <p>Beirut, Lebanon</p>
        <span className="location-icon">
          <MdLocationOn />
        </span>
      </div>
      <div className="age-div">
        <p>23 years old</p>
      </div>
    </div>
  );
}
