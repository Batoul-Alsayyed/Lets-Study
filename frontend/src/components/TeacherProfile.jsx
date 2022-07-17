import React from "react";
import "../index.css";
import profile from "../images/Account.png";

export default function TeacherProfile() {
  return (
    <div className="profile-page">
      <div className="left-side-profile">
        <div className="profile-pic">
          <img src={profile} alt="" />
        </div>
        <div className="side-nav-bar">
          <ul>
            <li className="active">PROFILE</li>
            <li>HOME</li>
            <li>MESSAGES</li>
            <li>LOGOUT</li>
          </ul>
        </div>
      </div>
      <div className="right-side-profile">
        <h1 className="profile-text">Account Settings</h1>
        <form action="">
          <div className="label">Name: </div>
          <div>
            <input type="text" value="Teacher" className="input" />
          </div>

          <div className="label">Email Address: </div>
          <div>
            <input
              type="text"
              value="teachertest@gmail.com"
              className="input"
            />
          </div>

          <div className="label">Date of Birth: </div>
          <div>
            <input type="text" value="15-9-1995" className="input" />
          </div>

          <div className="label">Study Field: </div>
          <div>
            <input type="text" value="Biology" className="input" />
          </div>

          <div className="label">Degree: </div>
          <div>
            <input type="text" value="Bachelor" className="input" />
          </div>
        </form>
      </div>
      <div className="right-side-profile"></div>
    </div>
  );
}
