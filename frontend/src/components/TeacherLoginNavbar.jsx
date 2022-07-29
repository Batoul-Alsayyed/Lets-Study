import React, { useState, useEffect } from "react";
import "../index.css";
import logo from "../images/logo/logo.png";
import account from "../images/Account.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginNavbar() {
  let access_token = localStorage.getItem("access_token");

  let navigate = useNavigate();

  const [user_id, setUserID] = useState(null);
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
        setUserID(res.data.id);
        setUserTypeId(res.data.user_type_id);
        console.log("here", res.data.id);
      });
  }, []);
  useEffect(() => {
    if (user_id) {
      if (user_type_id === "2") {
        //getting user profile image
        axios
          .post(`http://127.0.0.1:8000/api/teacher/getTeacherById`, {
            user_id: String(user_id),
          })
          .then((res) => {
            console.log("here", res.data.teacher);
            if (res.data.teacher[0].image_link) {
              setImage(res.data.teacher[0].image_link);
            }
          });
      }
    }
  }, [user_id]);
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
              <a className="navlink" href="/teachers">
                Teachers
              </a>
            </li>
            <li>
              <a className="navlink" href="/students">
                Students
              </a>
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
