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
  //imageClick
  const imageClick = () => {
    navigate("/PersonalProfile");
  };

  useEffect(() => {
    //since we have the access token in local storage
    //lets use it to retreive user info
    console.log("access token", access_token);
    axios
      .get(`http://127.0.0.1:8000/api/user/user-profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setName(res.data.name);
        setPath("/students/" + res.data.id);
        setUserTypeId(res.data.user_type_id);

        if (res.data.user_type_id === 0) {
          axios
            .post(`http://127.0.0.1:8000/api/student/getStudentById`, {
              user_id: user_id,
            })
            .then((res) => {
              setImage(res.data.student[0].image_link);
            });
        } else if (user_type_id === 2) {
          axios
            .post(`http://127.0.0.1:8000/api/teacher/getTeacherById`, {
              user_id: user_id,
            })
            .then((res) => {
              console.log("hereeeeeeeeeeeeeeee", res.data.teacher);
              console.log("", res.data.teacher[0].image_link);
              setImage(res.data.teacher[0].image_link);
            });
        }
      });
  }, []);
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="left-side">
          <div className="left-side-components">
            <img src={logo} alt="logo" />
            <p>Lets Study</p>
          </div>
        </div>
        <div className="right-side">
          <div className="right-side-components">
            <li>
              <a href="/study">Study Now</a>
            </li>
            <p>Welcome {name}</p>
            {!image ? null : (
              <img
                src={image}
                alt=""
                className="navbar-img"
                onClick={imageClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
