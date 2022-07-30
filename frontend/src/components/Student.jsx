import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import LoginNavbar from "./UserNavbar";
import "../index.css";
import axios from "axios";
import MapComponent from "./MapComponent";
import { useParams } from "react-router-dom";
import lamp from "../images/StudyLamp.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Student() {
  var access_token = localStorage.getItem("access_token");
  const [degrees, setDegrees] = useState(null);
  const [fields, setFields] = useState(null);
  const [clicked_button, setClickedButton] = useState(null);
  const [account_type, setAccountType] = useState(false);

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

  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const user_type_id = localStorage.getItem("user_type_id");

  useEffect(() => {
    //now checking if all of these values are set=> add a new student to the database with user_id = { id }
    if (
      student.lat != "" &&
      student.long != "" &&
      student.image_link != "" &&
      student.study_fields_id != "" &&
      student.degrees_id != "" &&
      user_id
    ) {
      //now just post those info and link them with create student API
      axios
        .post(`http://127.0.0.1:8000/api/student/add_student`, {
          user_id: user_id,
          account_type: 0, //since this student will start as a free member then if he/she fill payment form then we will update this value to be 1
          image_link: student.image_link,
          rate_number: 5, //rating for a student initially will be 5 before somebody rate him/her
          longitude: student.long,
          latitude: student.lat,
          study_fields_id: student.study_fields_id,
          degrees_id: student.degrees_id,
        })
        .then((res) => {
          toast.success("Your profile is complete now!");
          togglePopup();
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            "Error occured while completing your profile please refresh your page"
          );
        });
    }
  }, [student, user_id]);

  const saveFile = (e) => {
    var s;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      s = reader.result;
      setStudent({ ...student, image_link: s });
    };
    reader.readAsDataURL(file);
  };

  const studyWithStudents = (e) => {
    console.log("user_id in study with students", user_id);
    axios
      .post(`http://127.0.0.1:8000/api/student/ifStudent`, {
        user_id: user_id,
      })
      .then((res) => {
        console.log(res.data.response);
        if (res.data.response === true) {
          navigate("/students");
          return;
        }
        toast.error("Complete your profile");
        //setClickedButton("/students");
        togglePopup();
      })
      .catch((err) => {
        toast.error("Error occured");
      });
  };
  const studyWithTeachers = (e) => {
    console.log("user_id in study with teachers", user_id);
    axios
      .post(`http://127.0.0.1:8000/api/student/ifStudent`, {
        user_id: user_id,
      })
      .then((res) => {
        console.log("user id study with teachers", res.data.response);
        if (res.data.response === true) {
          //now we know that the current user is a student
          //now we have to check account type; if 0 then its a free account and direct the user to payment page
          // and if 1 then direct him/her to teachers page
          axios
            .post(`http://127.0.0.1:8000/api/student/getStudentById`, {
              user_id: user_id,
            })
            .then((res) => {
              console.log(res.data.student[0].account_type);
              console.log(typeof res.data.student[0].account_type);
              let account_type = res.data.student[0].account_type;
              if (account_type === "0") {
                //free memeber
                navigate("/payment");
              } else {
                //pro member
                navigate("/teachers");
              }
            });
          // navigate("/teachers");
          return;
        }
        //otherwise alert the user
        // setClickedButton("/teachers");
        toast.error("Complete your profile");
        //setClickedButton("/teachers");
        togglePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    //submit all user info and add them as a new student to the database
    // first lets get the chosen degree id and study field id using getDegreeByName and getStudyfieldByName
    let temp = { ...student };
    await axios
      .post(`http://127.0.0.1:8000/api/student/getDegreeByName`, {
        name: studentInfo.degrees,
      })
      .then((res) => {
        console.log("degree id = ", res.data.degree[0].id);
        temp["degrees_id"] = res.data.degree[0].id;
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post(`http://127.0.0.1:8000/api/student/getStudyfieldByName`, {
        name: studentInfo.study_fields,
      })
      .then((res) => {
        temp["study_fields_id"] = res.data.studyfield[0].id;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("anything");
    setStudent({ ...temp });
  };

  useEffect(() => {
    getDegrees();
    getStudyFields();
  }, []);

  const handleLocationClick = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async function (position) {
      setStudent({
        ...student,
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
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
  //--------------------------------------------------jsx----------------------------------------------------------------
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
            value="Complete your profile"
            onClick={togglePopup}
          />
          <p className="header-text">Start your study journey!</p>
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
                <br />
                <form className="form">
                  <div className="row">
                    <div className="column">
                      <label htmlFor="">Profile Picture</label>
                      <input
                        type="file"
                        className="col-file"
                        onChange={saveFile}
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
                  </div>
                  <div className="row">
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

                    <div className="column">
                      <label htmlFor="">Location</label>

                      <button
                        className="select-style"
                        onClick={handleLocationClick}
                      >
                        Current position
                      </button>
                    </div>
                  </div>

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
