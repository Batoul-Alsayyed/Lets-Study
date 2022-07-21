import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import LoginNavbar from "./LoginNavbar";
import "../index.css";
import axios from "axios";
import MapComponent from "./MapComponent";
import lamp from "../images/StudyLamp.png";
import { useNavigate } from "react-router-dom";

export default function Student() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  const studyWithStudents = (e) => {
    navigate("/students");
  };
  const studyWithTeachers = (e) => {
    navigate("/teachers");
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    alert("submit clicked");
  };
  const doNothing = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    document.getElementById("popup_button").click();
    getDegrees();
    getStudyFields();
  }, []);

  const componentDidMount = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      alert("Latitude is :" + position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      alert("Longitude is :" + position.coords.longitude);
    });
  };

  function getDegrees() {
    axios
      .get(`http://127.0.0.1:8000/api/admin/degrees`)
      .then((res) => {
        // console.log("length = ", res.data.degrees.length);
        for (var i = 0; i < res.data.degrees.length; i++) {
          // console.log(res.data.degrees[i].name);
          var d = res.data.degrees[i].name;
          document.getElementById("degree_dropdown").innerHTML +=
            "<option>" + d + " Degree </option>";
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error occured:" + err);
      });
  }
  function getStudyFields() {
    axios
      .get(`http://127.0.0.1:8000/api/student/fields`)
      .then((res) => {
        // console.log("length = ", res.data.study_field.length);
        for (var i = 0; i < res.data.study_field.length; i++) {
          // console.log(res.data.study_field[i].name);
          var d = res.data.study_field[i].name;
          document.getElementById("study_fields_dropdown").innerHTML +=
            "<option>" + d + "</option>";
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error occured:" + err);
      });
  }
  return (
    <div>
      <LoginNavbar />
      {/* Now adding the popup that will let the student to finish his/her profile */}

      <div className="student-container">
        <div>
          <input
            type="button"
            id="popup_button"
            className="hide-btn"
            value="Click to Open Popup"
            onClick={togglePopup}
          />
          <p className="header-text">Start your studying journey!</p>
          <p className="header-sub-text">
            Choose either to study with another student or with a professional
            tutor.
          </p>
          <div className="buttons-styling student-buttons">
            <button className="button1" onClick={studyWithTeachers}>
              Study with tutor
            </button>
            <button className="button2" onClick={studyWithStudents}>
              Study with student
            </button>
          </div>
        </div>
        <div>
          <img src={lamp} className="study-lamp" />
        </div>
      </div>

      {isOpen && (
        <Popup
          content={
            <>
              <div className="popup-div">
                <p>Finish Your Profile</p>
                <br />
                <form className="form">
                  <div className="row">
                    <div className="column">
                      <label htmlFor="">Profile Picture</label>
                      <input type="file" className="col-file" />
                    </div>

                    <div className="column">
                      <label htmlFor="">Type of Degree</label>
                      <select
                        className="select-style"
                        id="degree_dropdown"
                      ></select>
                    </div>

                    <div className="column">
                      <label htmlFor="">Study Field</label>
                      <select
                        className="select-style"
                        id="study_fields_dropdown"
                      ></select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="column">
                      <button
                        className="select-style location"
                        onClick={doNothing}
                      >
                        Location
                      </button>
                    </div>

                    <div className="column">
                      <button
                        className="select-style"
                        onClick={componentDidMount}
                      >
                        Current position
                      </button>
                    </div>

                    <div className="column">
                      <button className="select-style" onClick={doNothing}>
                        Find on the map
                      </button>
                    </div>
                  </div>
                  <div className="row3">
                    <MapComponent />
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="submit-popup-form"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}
