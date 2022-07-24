import React, { useEffect, useState } from "react";
import StudentPopup from "./StudentPopup";
import "../index.css";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

export default function AdminTeachers() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin/teachers`)
      .then((res) => {
        console.log("staus = > ", res.status);
        if (res.status + "" === "200") {
          console.log("sucesssss");
          console.log(res.data.students[0].id);
          setData(res.data.students);
        }
        throw res;
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  const HandleAddTeacher = (e) => {
    e.preventDefault();
    console.log("Clicked");
    togglePopup();
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
              console.log(i);
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
              <form action="" className="teacher-form">
                <div className="teacher-form-item">
                  <h1>Add a Teacher</h1>
                  <br />
                  <br />

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Full Name:{" "}
                    </label>
                    <br />
                    <input type="text" className="teacher-div-input" />
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Email:{" "}
                    </label>
                    <br />

                    <input type="email" className="teacher-div-input" />
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Password:{" "}
                    </label>
                    <br />

                    <input type="password" className="teacher-div-input" />
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Date of Birth:{" "}
                    </label>
                    <br />

                    <input type="date" className="teacher-div-input" />
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Longitude:{" "}
                    </label>
                    <br />

                    <input type="text" className="teacher-div-input" />
                  </div>
                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Latitude:{" "}
                    </label>
                    <br />

                    <input type="text" className="teacher-div-input" />
                  </div>
                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      latitude:{" "}
                    </label>
                    <br />

                    <input type="text" className="teacher-div-input" />
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Degrees:{" "}
                    </label>
                    <br />

                    <select name="" id="" className="teacher-div-input select">
                      <option value="">Bachelor</option>
                      <option value="">Masters</option>
                    </select>
                  </div>

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Study field:{" "}
                    </label>
                    <br />
                    <select name="" id="" className="teacher-div-input select">
                      <option value="">computer Science</option>
                      <option value="">Biology</option>
                    </select>
                  </div>
                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Image Link:{" "}
                    </label>
                    <br />
                    <input type="file" className="teacher-div-input" />
                  </div>
                  <button className="teacher-form-item-button">Submit</button>
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
