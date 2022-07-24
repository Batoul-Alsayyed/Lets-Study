import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import LoginNavbar from "./LoginNavbar";
import "../index.css";
import axios from "axios";
import MapComponent from "./MapComponent";
import { useParams } from "react-router-dom";
import lamp from "../images/StudyLamp.png";
import { useNavigate } from "react-router-dom";

export default function Student() {
  let { id } = useParams();
  const [degrees, setDegrees] = useState(null);
  const [fields, setFields] = useState(null);

  const [student, setStudent] = useState({
    image_link: "",
    lat: 0,
    long: 0,
    degrees_id: 0,
    study_fields_id: 0,
  });
  const [studentInfo, setStudentInfo] = useState({
    degrees: "Bachelor",
    study_fields: "Computer Science",
  });
  const [long, setLong] = useState({
    long: 0,
  });
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
    alert("submit clicked");

    //submit all user info and add them as a new student to the database
    // first lets get the chosen degree id and study field id using getDegreeByName and getStudyfieldByName
    axios
      .post(`http://127.0.0.1:8000/api/student/getDegreeByName`, {
        name: studentInfo.degrees,
      })
      .then((res) => {
        console.log("degree id = ", res.data.degree[0].id);
        setStudent({ ...student, degrees_id: res.data.degree[0].id });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(`http://127.0.0.1:8000/api/student/getStudyfieldByName`, {
        name: studentInfo.study_fields,
      })
      .then((res) => {
        console.log("study field id = ", res.data.studyfield[0].id);
        setStudent({ ...student, study_fields_id: res.data.studyfield[0].id });
      })
      .catch((err) => {
        console.log(err);
      });

    // //now just post those info and link them with create student API
    // axios
    //   .post(`http://127.0.0.1:8000/api/student/add_student`, {
    //     user_id: { id },
    //     account_type: 0,
    //     image_link: student.image_link,
    //     rate_number: 5, //rating for a student initially will be 5 before somebody rate him/her
    //     longitude: long.long,
    //     latitude: student.lat,
    //     study_fields_id: student.study_fields_id,
    //     degrees_id: student.degrees_id,
    //   })
    //   .then((res) => {
    //     console.log("Student successfully created ", res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert("Error occured:" + err);
    //   });
  };
  const doNothing = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    document.getElementById("popup_button").click();
    getDegrees();
    getStudyFields();
    console.log(student.degrees_id);
    console.log(student.study_fields_id);
  }, []);

  const handleLocationClick = (e) => {
    e.preventDefault();
    console.log("anything");

    navigator.geolocation.getCurrentPosition(async function (position) {
      setStudent({ ...student, lat: position.coords.latitude });
      console.log("Latitude", position.coords.latitude);

      console.log(student);

      if (student.lat != 0) {
        console.log("lat", student.lat);
      }
      setLong({ ...student, long: position.coords.longitude });
      if (student.long != 0) {
        console.log("long", student.long);
      }

      console.log("img link", student.image_link);
      if ((long.long != 0) & (student.lat != 0)) {
        alert("Your coordinates have been recorded");
      }
      console.log(studentInfo.degrees);
      console.log(studentInfo.study_fields);
    });
  };

  function getDegrees() {
    axios
      .get(`http://127.0.0.1:8000/api/admin/degrees`)
      .then((res) => {
        setDegrees(res.data.degrees);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getStudyFields() {
    axios
      .get(`http://127.0.0.1:8000/api/student/fields`)
      .then((res) => {
        setFields(res.data.study_fields);
      })
      .catch((err) => {
        console.log(err);
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
                      <input
                        type="file"
                        className="col-file"
                        onChange={(e) =>
                          setStudent({ ...student, image_link: e.target.value })
                        }
                      />
                    </div>

                    <div className="column">
                      <label htmlFor="">Type of Degree</label>
                      <select
                        className="select-style"
                        id="degree_dropdown"
                        onChange={(e) =>
                          setStudentInfo({
                            ...studentInfo,
                            degrees: e.target.value,
                          })
                        }
                      >
                        {degrees &&
                          degrees.map((i) => {
                            return (
                              <option value={i.name}>{i.name} Degree</option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="column">
                      <label htmlFor="">Study Field</label>
                      <select
                        className="select-style"
                        id="study_fields_dropdown"
                        onChange={(e) =>
                          setStudentInfo({
                            ...studentInfo,
                            study_fields: e.target.value,
                          })
                        }
                      >
                        {fields &&
                          fields.map((i) => {
                            return <option value={i.name}>{i.name}</option>;
                          })}
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
                        onClick={handleLocationClick}
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
                  <div className="row3">{/* <MapComponent /> */}</div>
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
