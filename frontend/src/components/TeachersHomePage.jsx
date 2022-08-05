import React from "react";
import LoginNavbar from "./LoginNavbar";
import Footer from "./Footer";
import "../index.css";
export default function TeachersHomePage() {
  return (
    <div>
      <div className="teachers-page">
        <LoginNavbar />
        <div className="teachers-header">
          <div className="t-h">
            <p className="teachers-header-p">Welcome to Lets Study</p>
            <p className="teachers-header-p1">
              Start your teaching journey with students from all around the
              world.
            </p>
            <button className="t-h-button">View Notes</button>
          </div>
        </div>

        <div className="teachers-header-left-side"></div>
      </div>
      <Footer />
    </div>
  );
}
