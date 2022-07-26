import React, { useState, useEffect } from "react";
import profile from "../images/christopher-campbell-rDEOVtE7vOs-unsplash 1.png";
import "../index.css";
import axios from "axios";

export default function PersonalProfile() {
  const [user_id, setUserID] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);
  const [date_of_birth, setDateOfBirth] = useState(null);
  const [user_type_id, setUserType] = useState(null);
  const [studyfield, setStudyField] = useState(null);
  const [studyfield_id, setStudyFieldId] = useState(null);
  const [degree, setDegree] = useState(null);
  const [degree_id, setDegreeId] = useState(null);
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
        setEmail(res.data.email);
        setDateOfBirth(res.data.date_of_birth);
        setUserID(res.data.id);
        setUserType(res.data.user_type_id);
      });
  });
  useEffect(() => {
    //getting user profile image
    console.log("user_type_id", user_type_id);
    if (user_type_id === "0") {
      axios
        .post(`http://127.0.0.1:8000/api/student/getStudentById`, {
          user_id: user_id,
        })
        .then((res) => {
          console.log("student", res.data.student);
          if (res.data.student[0].image_link) {
            setImage(res.data.student[0].image_link);
          }
        });
    } else if (user_type_id === "2") {
      axios
        .post(`http://127.0.0.1:8000/api/student/getTeacherById`, {
          user_id: user_id,
        })
        .then((res) => {
          console.log("teacher", res.data.teacher);
          if (res.data.teacher[0].image_link) {
            setImage(res.data.teacher[0].image_link);
          }
          setStudyFieldId(res.data.teacher[0].study_fields_id);
          setDegreeId(res.data.teacher[0].degrees_id);
        });
    }
  }, [user_type_id, user_id, studyfield_id, degree_id]);
  useEffect(() => {
    //now calling get degree by id and get study field by id
    axios
      .post(`http://127.0.0.1:8000/api/admin/getDegreeById`, {
        id: degree_id,
      })
      .then((res) => {
        console.log(res.data.degree[0].name);
        setDegree(res.data.degree[0].name);
      });
    //now calling get studyfield by id
    axios
      .post(`http://127.0.0.1:8000/api/admin/getStudyFieldById`, {
        id: studyfield_id,
      })
      .then((res) => {
        console.log(res.data.study_field[0].name);
        setStudyField(res.data.study_field[0].name);
      });
  }, [studyfield_id, degree_id]);
  return (
    <div>
      <p className="students-text">Account Settings</p>
      <div className="user-account">
        <div className="user-profile">
          {!image ? null : <img src={image} className="user-profile-img" />}
          <ul className="user-profile-links">
            <li className="user-profile-link active">Profile</li>
            <li className="user-profile-link">Messages</li>
            <li className="user-profile-link">Logout</li>
          </ul>
        </div>

        <div className="user-settings">
          <div className="user-info">
            <div>
              <label className="user-label">Name:</label>
            </div>
            <input type="text" className="user-input" value={name} />
          </div>
          <div className="user-info">
            <div>
              <label className="user-label">Email Address:</label>
            </div>
            <input type="text" className="user-input" value={email} />
          </div>
          <div className="user-info">
            <div>
              <label className="user-label">Date of Birth</label>
            </div>
            <input type="text" className="user-input" value={date_of_birth} />
          </div>
          <div className="user-info">
            <div>
              <label className="user-label">Study Field</label>
            </div>
            <input type="text" className="user-input" value={studyfield} />
          </div>
          <div className="user-info">
            <div>
              <label className="user-label">Degree</label>
            </div>
            {!degree ? null : (
              <input type="text" className="user-input" value={degree} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
