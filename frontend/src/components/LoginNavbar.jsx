import React, { useState, useEffect } from "react";
import "../index.css";
import logo from "../images/logo/logo.png";
import account from "../images/Account.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginNavbar() {
  let access_token = localStorage.getItem("access_token");
  let user_id = localStorage.getItem("user_id");
  let navigate = useNavigate();

  const [path, setPath] = useState(null);
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [user_type_id, setUserTypeId] = useState(null);
  const [isStudent, setIsStudent] = useState(false);
  //imageClick
  const imageClick = () => {
    navigate("/PersonalProfile");
  };
  const logoClickHandler = () => {
    navigate("/home");
  };

  useEffect(() => {
    //since we have the access token in local storage
    //lets use it to retreive user info
    if (access_token != null) {
      axios
        .get(`http://127.0.0.1:8000/api/user/user-profile`, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
          setName(res.data.name);
          setPath("/students/" + res.data.id);
          setUserTypeId(res.data.user_type_id);

          if (res.data.user_type_id === 0) {
            setIsStudent(true);
            axios
              .post(`http://127.0.0.1:8000/api/student/getStudentById`, {
                user_id: user_id,
              })
              .then((res) => {
                setImage(res.data.student[0].image_link);
              });
          } else {
            axios
              .post(`http://127.0.0.1:8000/api/teacher/getTeacherById`, {
                user_id: user_id,
              })
              .then((res) => {
                setImage(res.data.teacher[0].image_link);
              });
          }
        });
    }
  }, []);
  return (
    <div className="navbar">
      <div className="navbar-container2">
        <div className="left-side2">
          <div className="left-side-components">
            <a href="">
              <img src={logo} alt="logo" onClick={logoClickHandler} />
            </a>
            <p>Lets Study</p>
          </div>
        </div>
        <div className="right-side2">
          <div className="right-side-components">
            {!isStudent && (
              <li>
                <a href="/thome">Home</a>
              </li>
            )}

            {isStudent && (
              <>
                <li>
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="/study">Study Now</a>
                </li>
              </>
            )}
            {!isStudent && (
              <>
                <li>
                  <a href="/teachers">Teachers</a>
                </li>
                <li>
                  <a href="/students">Students</a>
                </li>
              </>
            )}
            <p>Welcome {name}</p>
            {!image ? null : (
              <a href="">
                <img
                  src={image}
                  alt=""
                  className="navbar-img"
                  onClick={imageClick}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
