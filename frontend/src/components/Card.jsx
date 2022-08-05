import React, { useRef, useState, useEffect } from "react";
import "../index.css";
import student2 from "../images/asian-college-student-400x400 2.png";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Card({
  student_rate_number,
  student_latitude,
  student_longitude,
  student_image_link,
  student_user_id,
}) {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    age: 0,
    date_of_birth: "",
  });
  const OnClickHandler = () => {
    navigate("/user/" + student_user_id);
  };
  function getName() {
    axios
      .post(`http://127.0.0.1:8000/api/user/getUserById`, {
        id: student_user_id,
      })
      .then((res) => {
        setUser({
          ...user,
          name: res.data.user[0].name,
          date_of_birth: res.data.user[0].date_of_birth,
        });
      });
  }
  function getAge() {
    if (user.date_of_birth) {
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      const year_born = user.date_of_birth.split("-")[0];
      var age = currentYear - year_born;
      setUser({ ...user, age: age });
    }
  }
  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    getAge();
  }, [user.date_of_birth]);

  return (
    <div className="card" onClick={OnClickHandler}>
      <img src={student_image_link} className="card-img" />
      <div className="age-div">
        <p className="user-name">{user.name}</p>
        <span className="rate">{student_rate_number}</span>
        <FaStar className="star-icon"></FaStar>
      </div>
      <div className="age-div">
        <p>{user.age} years old</p>
      </div>
      <br />
    </div>
  );
}
