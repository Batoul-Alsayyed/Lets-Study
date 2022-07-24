import React, { useEffect, useState } from "react";
import StudentPopup from "./StudentPopup";
import "../index.css";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

export default function AdminTeachers() {
  const [data, setData] = useState(null);
  const [degrees, setDegrees] = useState(null);
  const [studyfields, setStudyfields] = useState(null);
  const [degree_id, setDegreeId] = useState(null);
  const [teacher, setTeacher] = useState({
    name: "",
    password: "",
    date_of_birth: "",
    image_link: "",
    longitude: "",
    latitude: "",
    degree: "Bachelor",
    study_field: "Computer Science",
  });

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin/teachers`)
      .then((res) => {
        //console.log("staus = > ", res.status);
        if (res.status + "" === "200") {
          setData(res.data.students);
        }
        throw res;
      })

      .catch((err) => {
        //console.log(err);
      });

    //getting all degrees
    axios
      .get(`http://127.0.0.1:8000/api/admin/degrees`)
      .then((res) => {
        //console.log("staus = > ", res.status);
        if (res.status + "" === "200") {
          //console.log("sucesssss");
          setDegrees(res.data.degrees);
        }
        throw res;
      })

      .catch((err) => {
        //console.log(err);
      });

    //getting all study fields
    axios
      .get(`http://127.0.0.1:8000/api/admin/fields`)
      .then((res) => {
        //console.log("staus = > ", res.status);
        if (res.status + "" === "200") {
          setStudyfields(res.data.study_fields);
        }
        throw res;
      })

      .catch((err) => {
        //console.log(err);
      });
    if (degree_id) {
      console.log("degree id here => ", degree_id);
    }
  }, [degree_id]);
  const HandleAddTeacher = (e) => {
    e.preventDefault();
    //console.log("Clicked");
    togglePopup();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // get selected degree id
    //using get degree by name
    axios
      .post(`http://127.0.0.1:8000/api/admin/getDegreeByName`, {
        name: teacher.degree,
      })
      .then((res) => {
        setDegreeId(res.data.degree[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="adminpanel-container">
      <AdminNavbar />
      <div className="teacher-text">
        <h1>Teachers</h1>
      </div>
      <div className="admin-table">
        <table>
          <tr>
            <th>id</th>
            <th>user_id</th>
            <th>image_link</th>
            <th>rate_number</th>
            <th>longitude</th>
            <th>latitude</th>
            <th>degrees_id</th>
            <th>study_fields_id</th>
          </tr>
          {data &&
            data.map((i, index) => {
              //console.log(i);
              return (
                <tr>
                  <td>{i.id}</td>
                  <td>{i.user_id}</td>
                  <td>{i.image_link}</td>
                  <td>{i.rate_number}</td>
                  <td>{i.longitude}</td>
                  <td>{i.latitude}</td>
                  <td>{i.degrees_id}</td>
                  <td>{i.study_fields_id}</td>
                </tr>
              );
            })}
        </table>
        <div className="admin-buttons">
          <button className="admin-btn" onClick={HandleAddTeacher}>
            Add
          </button>
          <button className="admin-btn">Delete</button>
        </div>
      </div>
      {isOpen && (
        <StudentPopup
          className="popup-size"
          content={
            <>
              <form className="teacher-form" onSubmit={submitHandler}>
                <div className="teacher-form-item">
                  <h1>Add a Teacher</h1>
                  <br />
                  <br />

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Full Name:{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      className="teacher-div-input"
                      onChange={(e) =>
                        setTeacher({ ...teacher, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Email:{" "}
                    </label>
                    <br />

                    <input
                      type="email"
                      className="teacher-div-input"
                      onChange={(e) =>
                        setTeacher({ ...teacher, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Password:{" "}
                    </label>
                    <br />

                    <input
                      type="password"
                      className="teacher-div-input"
                      onChange={(e) =>
                        setTeacher({ ...teacher, password: e.target.value })
                      }
                    />
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Date of Birth:{" "}
                    </label>
                    <br />

                    <input
                      type="date"
                      className="teacher-div-input"
                      onChange={(e) =>
                        setTeacher({
                          ...teacher,
                          date_of_birth: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Longitude:{" "}
                    </label>
                    <br />

                    <input
                      type="text"
                      className="teacher-div-input"
                      onChange={(e) =>
                        setTeacher({ ...teacher, longitude: e.target.value })
                      }
                    />
                  </div>
                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Latitude:{" "}
                    </label>
                    <br />

                    <input
                      type="text"
                      className="teacher-div-input"
                      onChange={(e) =>
                        setTeacher({ ...teacher, latitude: e.target.value })
                      }
                    />
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Degrees:{" "}
                    </label>
                    <br />

                    <select
                      className="teacher-div-input select"
                      onChange={(e) =>
                        setTeacher({ ...teacher, degree: e.target.value })
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

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Study field:{" "}
                    </label>
                    <br />
                    <select
                      className="teacher-div-input select"
                      onChange={(e) =>
                        setTeacher({ ...teacher, study_field: e.target.value })
                      }
                    >
                      {studyfields &&
                        studyfields.map((i) => {
                          return <option value={i.name}>{i.name}</option>;
                        })}
                    </select>
                  </div>
                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Image Link:{" "}
                    </label>
                    <br />
                    <input
                      type="file"
                      className="teacher-div-input"
                      onChange={(e) =>
                        setTeacher({ ...teacher, image_link: e.target.value })
                      }
                    />
                  </div>
                  <button className="teacher-form-item-button" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}
