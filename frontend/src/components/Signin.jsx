import React, { useState } from "react";
import axios from "axios";
import img6 from "../images/Online Reading.png";
import SignupButton from "./SignupButton";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  let navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [user_type, setUserType] = useState({ user_type: "" });
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const [user_id, setUserId] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };
  const Login = (details) => {
    axios
      .post(`http://127.0.0.1:8000/api/user/login`, {
        email: details.email,
        password: details.password,
      })
      .then((res) => {
        console.log("user id = ", res.data.user.id);
        setUserId(res.data.user.user_type_id);
        setUser({
          email: details.email,
        });

        //get user type using getusertype API
        axios
          .post(`http://127.0.0.1:8000/api/user/getUserType`, {
            id: res.data.user.user_type_id,
          })
          .then((res) => {
            console.log(res.data.user[0].type);
            if (res.data.user[0].type === "teacher") {
              console.log("user_id", user_id);
              navigate("/PersonalProfile/" + res.data.user.id);
            } else if (res.data.user[0].type === "student") {
              navigate("/students");
            } else if (res.data.user[0].type === "admin") {
              navigate("/admin");
            }
          });
      })
      .catch((err) => {
        console.log(err);
        alert("Wrong email or password!");
      });
  };
  return (
    <div className="signup-layout">
      <div className="signup-left-display">
        <img className="signup-img" src={img6} alt="" />
        <p className="signup-text">Not a member? Register now</p>
      </div>
      <form className="signup-right-display" onSubmit={submitHandler}>
        <p className="signup-welcome">Welcome to Lets Study</p>
        <label className="signup-label">Email</label>
        <input
          className="signup-input"
          type="text"
          id="email"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          value={details.email}
        />
        <label className="signup-label">Password</label>
        <input
          className="signup-input"
          type="password"
          id="password"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          value={details.password}
        />
        <SignupButton type="submit" content={"Sign in"}></SignupButton>
      </form>
    </div>
  );
}
