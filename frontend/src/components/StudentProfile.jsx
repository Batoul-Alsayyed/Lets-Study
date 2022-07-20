import React from "react";
import { useParams } from "react-router-dom";
import LoginNavbar from "../components/LoginNavbar";
import profile from "../images/Frame 4.png";
export default function StudentProfile() {
  let { id } = useParams();

  return (
    <div>
      <LoginNavbar />
      <p className="student-profile-title">Student profile</p>
      <div className="student-profile">
        <div className="student-profile-content">
          <div>Name: Student A</div>
          <div>Age: 18 years old</div>
          <div>Rating: </div>
          <div>Location: Beirut, Lebanon</div>
          <div>Email: Student@gmail.com</div>
        </div>
        <div className="student-profile-content">
          <img src={profile} className="student-profile-img" />
        </div>
      </div>
      <div className="centered">
        <button className="rate-btn">Rate this student</button>
      </div>
    </div>
  );
}
