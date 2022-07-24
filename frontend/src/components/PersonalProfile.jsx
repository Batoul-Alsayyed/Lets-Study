import React, { useState, useEffect } from "react";
import profile from "../images/christopher-campbell-rDEOVtE7vOs-unsplash 1.png";
import "../index.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PersonalProfile() {
  let { id } = useParams();
  //   console.log({ id }.id);
  const user_id = { id }.id;

  const [student, setStudent] = useState({
    name: "",
    email: "",
    date_of_birth: "",
    study_field: "",
    degree: "",
  });
  const [info, setInfo] = useState({
    degree_id: "",
    study_field_id: "",
  });

  useEffect(() => {
    axios
      .post(`http://127.0.0.1:8000/api/student/getStudentById`, {
        user_id: user_id,
      })
      .then((res) => {
        // console.log(res.data.student[0].study_fields_id);
        // console.log(res.data.student[0].degrees_id);

        setInfo({
          ...info,
          degree_id: res.data.student[0].degrees_id,
          study_field_id: res.data.student[0].study_fields_id,
        });

        // console.log(info);
        axios
          .post(`http://127.0.0.1:8000/api/user/getUserById`, {
            id: user_id,
          })
          .then((res) => {
            // console.log("user id = ", res.data.user[0].name);
            setStudent({
              ...student,
              name: res.data.user[0].name,
              email: res.data.user[0].email,
              date_of_birth: res.data.user[0].date_of_birth,
            });
            // console.log(student);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    //getting user study field and degree using their ids respectively
    axios
      .post(`http://127.0.0.1:8000/api/student/getStudyFieldById`, {
        id: info.study_field_id,
      })
      .then((res) => {
        console.log("study field ", res.data.study_field[0].name);
        setStudent({
          ...student,
          study_field: res.data.study_field[0].name,
        });
      });

    axios
      .post(`http://127.0.0.1:8000/api/student/getDegreeById`, {
        id: info.study_field_id,
      })
      .then((res) => {
        console.log("degree name= ", res.data.degree[0].name);
        setStudent({
          ...student,
          degree: res.data.degree[0].name,
        });
      });
    // setTimeout(() => {
    //   console.log(student);
    // }, 2000);

    console.log(student);
    console.log(student);
  }, []);
  return (
    <div>
      <p className="students-text">Account Settings</p>
      <div className="user-account">
        <div className="user-profile">
          <img className="user-profile-img" src={profile} alt="" />
          <ul className="user-profile-links">
            <li className="user-profile-link active">Profile</li>
            <li className="user-profile-link">Home</li>
            <li className="user-profile-link">Messages</li>
            <li className="user-profile-link">Logout</li>
          </ul>
        </div>

        <div className="user-settings">
          <div className="user-info">
            <div>
              <label className="user-label">Name</label>
            </div>
            <input type="text" className="user-input" value="user name" />
          </div>
          <div className="user-info">
            <div>
              <label className="user-label">Email Address</label>
            </div>
            <input
              type="text"
              className="user-input"
              value="emailaddress@gmail.com"
            />
          </div>
          <div className="user-info">
            <div>
              <label className="user-label">Date of Birth</label>
            </div>
            <input type="text" className="user-input" value="01/01/2000" />
          </div>
          <div className="user-info">
            <div>
              <label className="user-label">Study Field</label>
            </div>
            <input type="text" className="user-input" value="study field" />
          </div>
          <div className="user-info">
            <div>
              <label className="user-label">Degree</label>
            </div>
            <input type="text" className="user-input" value="degree" />
          </div>
        </div>
      </div>
    </div>
  );
}
