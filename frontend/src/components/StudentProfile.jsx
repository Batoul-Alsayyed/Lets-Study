import React, { useState, useEffect } from "react";
import RatePopup from "./RatePopup";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import LoginNavbar from "../components/LoginNavbar";
import profile from "../images/Frame 4.png";
import { RiStarFill } from "react-icons/ri";
import { BsChatQuote } from "react-icons/bs";
import axios from "axios";

export default function StudentProfile() {
  const [rating, setRating] = useState(false);

  const ratingChanged = (newRating) => {
    console.log("new rating", newRating);
    setRating(newRating);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    age: 0,
    date_of_birth: "",
    rate_number: "",
    email: "",
  });
  const [info, setInfo] = useState({
    image_link: "",
    rate_number: "",
  });

  let { id } = useParams();
  console.log({ id }.id);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const rateClicked = (e) => {
    e.preventDefault();
    togglePopup();
  };
  const submit_rate = (e) => {
    e.preventDefault();
    //save rated stars to updateRateNumberByUserId API
    axios
      .post(`http://127.0.0.1:8000/api/user/add_rating`, {
        user_id: { id }.id,
        rate_number: rating,
      })
      .then((res) => {
        axios
          .post(`http://127.0.0.1:8000/api/user/updateRateNumberByUserId`, {
            user_id: { id }.id,
          })
          .then((res) => {
            console.log(res.data);
          });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    togglePopup();
  };
  function getName() {
    console.log();

    axios
      .post(`http://127.0.0.1:8000/api/user/getUserById`, {
        id: { id }.id,
      })
      .then((res) => {
        console.log(res.data.user);
        setUser({
          ...user,
          name: res.data.user[0].name,
          date_of_birth: res.data.user[0].date_of_birth,
          email: res.data.user[0].email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getInfo() {
    console.log();

    axios
      .post(`http://127.0.0.1:8000/api/student/getStudentById`, {
        user_id: { id }.id,
      })
      .then((res) => {
        console.log("student=>", res.data.student[0].image_link);
        setInfo({
          ...info,
          image_link: res.data.student[0].image_link,
          rate_number: parseInt(res.data.student[0].rate_number),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getAge() {
    if (user.date_of_birth) {
      console.log(user.date_of_birth);
      var currentDate = new Date();
      console.log(currentDate);
      var currentYear = currentDate.getFullYear();
      console.log(currentYear);
      const year_born = user.date_of_birth.split("-")[0];
      console.log("year born ", year_born);
      var age = currentYear - year_born;
      console.log("age: ", age);
      setUser({ ...user, age: age });
    }
  }
  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    getAge();
    getInfo();
  }, [user.date_of_birth]);

  return (
    <div>
      <LoginNavbar />

      {isOpen && (
        <RatePopup
          content={
            <div className="pop-up">
              <h1 className="rate-text">Rate {user.name}</h1>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={60}
                activeColor="#ffd700"
              />
              <div>
                <button className="submit-pop-up" onClick={submit_rate}>
                  Submit
                </button>
              </div>
            </div>
          }
          handleClose={togglePopup}
        />
      )}

      <p className="student-profile-title">{user.name} profile</p>
      <div className="student-profile">
        <div className="student-profile-content">
          <div>
            Name: <span className="user-email">{user.name}</span>
          </div>
          <div>
            Age: <span className="user-email">{user.age} years old</span>
          </div>
          <div>
            Rating:
            <span className="rate-stars" id="icons">
              {[...Array(info.rate_number)].map((elementInArray, index) => {
                return <RiStarFill className="star" />;
              })}
            </span>
          </div>
          <div>
            Email: <span className="user-email">{user.email}</span>{" "}
            <BsChatQuote />
          </div>
        </div>
        <div className="student-profile-content">
          <img src={info.image_link} className="student-profile-img" />
        </div>
      </div>
      <div className="centered">
        <button className="rate-btn" onClick={rateClicked}>
          Rate this student
        </button>
      </div>
    </div>
  );
}
{
  /* <div>Location: Beirut, Lebanon</div> */
}
