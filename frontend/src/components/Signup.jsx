import React, { useState } from "react";
import axios from "axios";
import img6 from "../images/Online Reading.png";
import SignupButton from "./SignupButton";
import "../index.css";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    date_of_birth: "",
    user_type_id: "",
  });
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmed_password: "",
    date_of_birth: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    Register(details);
  };
  const Register = (details) => {
    //first we have to check if the 2 entered passwords are correct or not
    // if they are not equal
    //alert the user
    if (details.password !== details.confirmed_password) {
      alert("The 2 passwords don't match password!");
    }
    //if they are equal then run the API
    else {
      //Always assign user_type_id to 2 because only the students are going to register for new account
      //admins and teachers can't register for new accounts
      axios
        .post(`http://127.0.0.1:8000/api/user/register`, {
          name: details.name,
          email: details.email,
          password: details.password,
          date_of_birth: details.date_of_birth,
          user_type_id: "2",
        })
        .then((res) => {
          console.log(res);
          setUser({
            name: details.name,
            email: details.email,
            password: details.password,
            date_of_birth: details.date_of_birth,
          });
          navigate("/student");
        })
        .catch((err) => {
          //if error occured when adding new user to the database
          console.log(err);
          alert("Error occured: user already exits!");
        });
    }
  };

  return (
    <div className="signin-layout">
      <div className="signin-left-display">
        <img className="signin-img" src={img6} alt="" />
        <p className="signup-text">Already a member? Sign in</p>
      </div>
      <form className="signin-right-display" onSubmit={submitHandler}>
        <p className="signin-welcome">Welcome to Lets Study</p>
        <label className="signin-label">Name</label>
        <input
          className="signin-input"
          type="text"
          id="name"
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          value={details.name}
        />
        <label className="signin-label">Email</label>
        <input
          className="signin-input"
          type="email"
          id="email"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          value={details.email}
        />
        <label className="signin-label">Password</label>
        <input
          className="signin-input"
          type="password"
          id="password"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          value={details.password}
        />

        <label className="signin-label">Confirm Password</label>
        <input
          className="signin-input"
          type="password"
          id="confirmed_password"
          onChange={(e) =>
            setDetails({ ...details, confirmed_password: e.target.value })
          }
          value={details.confirmed_password}
        />

        <label className="signin-label">Date of Birth</label>
        <input
          className="signin-input"
          type="date"
          id="date_of_birth"
          onChange={(e) =>
            setDetails({ ...details, date_of_birth: e.target.value })
          }
          value={details.date_of_birth}
        />

        <SignupButton type="submit" content={"Sign up"}></SignupButton>
      </form>
    </div>
  );
}
