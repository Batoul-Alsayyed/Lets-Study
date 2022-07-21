import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import LoginNavbar from "./LoginNavbar";
import "../index.css";
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
                      <select className="select-style">
                        <option value="masters">Masters Degree</option>
                        <option value="bachelor">Bachelor Degree</option>
                        <option defaultValue="high-school">High School</option>
                      </select>
                    </div>

                    <div className="column">
                      <label htmlFor="">Study Field</label>
                      <select className="select-style">
                        <option value="">Computer Science</option>
                        <option value="">Public Health</option>
                        <option value="">Life Sciences</option>
                        <option defaultValue="">General Sciences</option>
                        <option value="">Human Sciences</option>
                        <option value="">Economics</option>
                      </select>
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
