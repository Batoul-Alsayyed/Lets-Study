import React from "react";
import Navbar from "../components/Navbar";
import LoginNavbar from "./LoginNavbar";
import "../index.css";
import axios from "axios";
import header from "../images/header.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();
  let user_id = localStorage.getItem("user_id");
  let user_type_id = localStorage.getItem("user_type_id");
  const studyOnClick = (e) => {
    e.preventDefault();
    if (user_id) {
      navigate("/students");
    } else {
      navigate("/Signup");
    }
  };

  const proOnClick = (e) => {
    e.preventDefault();
    //check if the user has logged in
    if (user_id) {
      console.log("hhh");
      //now check if he is a student
      if (user_type_id === "0") {
        //the user is a student
        //check if he/she is a pro or free member
        //if pro=> navigate to tutors page
        //if he is a free member => navigate to study page
        axios
          .post(`http://127.0.0.1:8000/api/student/getStudentById`, {
            user_id: user_id,
          })
          .then((res) => {
            let account_type = res.data.student[0].account_type;
            if (account_type === "0") {
              //free memeber
              navigate("/study");
            } else {
              //pro member
              navigate("/teachers");
            }
          });
      }
    } else {
      navigate("/Signup");
    }
  };
  {
    if (user_id) {
      return (
        <div>
          <LoginNavbar />
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
  }
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
