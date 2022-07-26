import React, { useRef, useState, useEffect } from "react";
import "../index.css";
import student2 from "../images/asian-college-student-400x400 2.png";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
export default function Card({
  student_rate_number,
  student_latitude,
  student_longitude,
  student_image_link,
  student_user_id,
}) {
  const [user, setUser] = useState({
    name: "",
    age: "",
    date_of_birth: "",
  });
  // const [user, setUser] = useState(null);
  function getName() {
    console.log(student_user_id);

    axios
      .post(`http://127.0.0.1:8000/api/user/getUserById`, {
        id: student_user_id,
      })
      .then((res) => {
        console.log(res.data.user);
        setUser({ ...user, name: res.data.user[0].name });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getName();
  }, []);
  return (
    <div className="card">
      <img src={student_image_link} className="card-img" />
      <div className="age-div">
        <p className="user-name">{user.name}</p>
        <span className="rate">{student_rate_number}</span>
        <FaStar className="star-icon"></FaStar>
      </div>
      {/* <div className="location-div">
        <p>
          Latitude: {student_latitude}
          Longitude: {student_longitude}
        </p>
        <span className="location-icon">
          <MdLocationOn />
        </span>
      </div> */}
      <div className="age-div">
        <p>23 years old</p>
      </div>
      <br />
    </div>
  );
}
