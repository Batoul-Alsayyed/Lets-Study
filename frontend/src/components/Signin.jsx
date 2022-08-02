import axios from "axios";
import img6 from "../images/Online Reading.png";
import SignupButton from "./SignupButton";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  let navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [user_typeId, setUserTypeId] = useState(null);
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const [user_id, setUserId] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };
  useEffect(() => {
    if (user_typeId != null) {
      if (user_typeId === 2) {
        localStorage.setItem("user_type_id", user_typeId);
        navigate("/PersonalProfile");
      } else if (user_typeId === 0) {
        console.log("okay");
        localStorage.setItem("user_type_id", user_typeId);
        navigate("/study");
      } else if (user_typeId === 1) {
        localStorage.setItem("user_type_id", user_typeId);
        navigate("/admin");
      }
    }
  }, [user_typeId]);
  const Login = (details) => {
    axios
      .post(`http://127.0.0.1:8000/api/user/login`, {
        email: details.email,
        password: details.password,
      })
      .then((res) => {
        //access_token
        localStorage.setItem("access_token", res.data.access_token);
        setUserTypeId(res.data.user.user_type_id);
        setUserId(res.data.user.id);
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("user_type_id", res.data.user.user_type_id);
        setUser({
          email: details.email,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wrong email or password");
      });
  };
  return (
    <div className="signup-layout">
      <div className="signup-left-display">
        <img className="signup-img" src={img6} alt="" />
        <p className="signup-text">
          Not a member?{" "}
          <a href="/Signup" className="register-btn">
            Register now
          </a>
        </p>
      </div>
      <div>
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
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
          <SignupButton type="submit" content={"Sign in"}></SignupButton>
        </form>
      </div>
    </div>
  );
}
