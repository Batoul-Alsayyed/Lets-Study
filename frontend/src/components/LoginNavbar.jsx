import React, { useState, useEffect } from "react";
import "../index.css";
import logo from "../images/logo/logo.png";
import account from "../images/Account.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginNavbar() {
  let navigate = useNavigate();

  const [user_id, setUserID] = useState(null);
  const [path, setPath] = useState(0);
  const [name, setName] = useState(0);
  const [image, setImage] = useState(0);
  //imageClick
  const imageClick = () => {
    navigate("/PersonalProfile");
  };

  useEffect(() => {
    //since we have the access token in local storage
    //lets use it to retreive user info
    // console.log(localStorage.getItem("access_token"));
    let access_token = localStorage.getItem("access_token");
    axios
      .get(`http://127.0.0.1:8000/api/user/user-profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setName(res.data.name);
        setPath("/students/" + res.data.id);
        setUserID(res.data.id);
        console.log("here", res.data.id);
        //getting user profile image
        axios
          .post(`http://127.0.0.1:8000/api/student/getStudentById`, {
            user_id: res.data.id,
          })
          .then((res) => {
            console.log("here", res.data.student);
            if (res.data.student[0].image_link) {
              setImage(res.data.student[0].image_link);
            }
          });
      });
  });
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
            <a href={path}>Study Now</a>
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
