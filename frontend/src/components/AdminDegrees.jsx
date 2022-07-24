import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import StudentPopup from "./StudentPopup";
import AdminNavbar from "./AdminNavbar";
export default function AdminDegrees() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [degree_id, setDegreeID] = useState(null);
  const [degree_name, setDegreeName] = useState(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };
  const HandleAddDegree = (e) => {
    e.preventDefault();
    togglePopup();
  };
  const HandleDeleteDegree = (e) => {
    e.preventDefault();
    togglePopup2();
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(degree_name);
    axios
      .post(`http://127.0.0.1:8000/api/admin/add_degree`, {
        name: degree_name,
      })
      .then((res) => {
        console.log(res);
        togglePopup();
      })
      .catch((err) => {
        togglePopup();
        console.log(err);
      });
  };
  const submitHandler2 = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin/degrees`)
      .then((res) => {
        console.log("staus = > ", res.status);
        if (res.status + "" === "200") {
          console.log("sucesssss");
          console.log(res.data.degrees[0].id);
          setData(res.data.degrees);
        }
        throw res;
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="adminpanel-container">
      <AdminNavbar />
      <div className="teacher-text">
        <h1>Degrees</h1>
      </div>
      <div className="admin-table">
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
          {data &&
            data.map((i, index) => {
              return (
                <tr>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                </tr>
              );
            })}
        </table>
        <div className="admin-buttons">
          <button className="admin-btn" onClick={HandleAddDegree}>
            Add
          </button>
          <button className="admin-btn" onClick={HandleDeleteDegree}>
            Delete
          </button>
        </div>
      </div>
      {isOpen && (
        <StudentPopup
          className="popup-size"
          content={
            <>
              <form className="teacher-form" onSubmit={submitHandler}>
                <div className="teacher-form-item">
                  <h1>Add a Degree</h1>
                  <br />
                  <br />

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Degree Name:{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      className="teacher-div-input"
                      onChange={(e) => setDegreeName(e.target.value)}
                    />
                  </div>
                  <button
                    className="teacher-form-item-button delete"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          }
          handleClose={togglePopup}
        />
      )}
      {isOpen2 && (
        <StudentPopup
          className="popup-size"
          content={
            <>
              <form className="teacher-form" onSubmit={submitHandler2}>
                <div className="teacher-form-item">
                  <h1>Delete a Degree</h1>
                  <br />
                  <br />

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Degree ID:{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      className="teacher-div-input"
                      onChange={(e) => setDegreeID(e.target.value)}
                    />
                  </div>
                  <button
                    className="teacher-form-item-button delete"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          }
          handleClose={togglePopup2}
        />
      )}
    </div>
  );
}
