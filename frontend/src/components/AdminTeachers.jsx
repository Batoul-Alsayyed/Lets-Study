import React, { useEffect, useState } from "react";
import StudentPopup from "./StudentPopup";
import "../index.css";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";

export default function AdminTeachers() {
  let access_token = localStorage.getItem("access_token");

  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const [degrees, setDegrees] = useState(null);
  const [studyfields, setStudyfields] = useState(null);
  const [degree_id, setDegreeId] = useState(null);
  const [study_field_id, setStudyFieldId] = useState(null);
  const [teacher_id, setTeacherID] = useState(null);
  const [img, setImg] = useState(null);
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
  const [isOpen2, setIsOpen2] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/user-profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then(
        (res) => {
          setName(res.data.name);
        },
        [access_token]
      );
  });
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/admin/teachers`).then((res) => {
      if (res.status + "" === "200") {
        setData(res.data.teachers);
      }
      throw res;
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
    //Checking if all values are set
    //Then post these values to add teacher API
    // console.log(teacher);
    console.log(teacher.image_link);
    if (
      teacher.name != "" &&
      teacher.password != "" &&
      teacher.date_of_birth != "" &&
      teacher.longitude != "" &&
      teacher.latitude != "" &&
      teacher.email != "" &&
      teacher.image_link != "" &&
      degree_id &&
      study_field_id
    ) {
      //alert(" all teacher values are assigned now");
      //adding new teacher to the database
      axios
        .post(`http://127.0.0.1:8000/api/admin/addTeacherAndUser`, {
          name: teacher.name,
          email: teacher.email,
          password: teacher.password,
          user_type_id: 2,
          date_of_birth: teacher.date_of_birth,
          image_link: teacher.image_link,
          rate_number: 5,
          longitude: teacher.longitude,
          latitude: teacher.latitude,
          degrees_id: degree_id,
          study_fields_id: study_field_id,
        })
        .then((res) => {
          toast.success("Teacher added successfully");
          console.log(res);
          togglePopup();
        })
        .catch((err) => {
          toast.error("Error occured", err);
          console.log(err);
          console.log(teacher);
          console.log(degree_id);
          console.log(study_field_id);
          togglePopup();
        });
    }
  }, [degree_id, study_field_id, teacher.image_link]);

  const HandleAddTeacher = (e) => {
    e.preventDefault();
    togglePopup();
  };
  const HandleDeleteTeacher = (e) => {
    e.preventDefault();
    togglePopup2();
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

    // get selected study field id
    //using get study field by name
    axios
      .post(`http://127.0.0.1:8000/api/admin/getStudyfieldByName`, {
        name: teacher.study_field,
      })
      .then((res) => {
        setStudyFieldId(res.data.studyfield[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitHandler2 = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/api/admin/teacher`, {
        id: teacher_id,
      })
      .then((res) => {
        console.log(res);
        togglePopup2();
      })
      .catch((err) => {
        togglePopup2();
        console.log(err);
      });
  };
  const saveFile = (e) => {
    var s;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      s = reader.result;
      setTeacher({ ...teacher, image_link: s });
    };
    reader.readAsDataURL(file);
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
            <th>rate_number</th>
            <th>longitude</th>
            <th>latitude</th>
            <th>degrees_id</th>
            <th>study_fields_id</th>
            <th>image_link</th>
          </tr>
          {data &&
            data.map((i, index) => {
              return (
                <tr>
                  <td>{i.id}</td>
                  <td>{i.user_id}</td>
                  <td>{i.rate_number}</td>
                  <td>{i.longitude}</td>
                  <td>{i.latitude}</td>
                  <td>{i.degrees_id}</td>
                  <td>{i.study_fields_id}</td>
                  <td className="admin-teacher-img">
                    <img src={i.image_link} />
                  </td>
                </tr>
              );
            })}
        </table>
        <div className="admin-buttons">
          <button className="admin-btn" onClick={HandleAddTeacher}>
            Add
          </button>
          <button className="admin-btn" onClick={HandleDeleteTeacher}>
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
                      onChange={saveFile}
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

      {isOpen2 && (
        <StudentPopup
          className="popup-size"
          content={
            <>
              <form className="teacher-form" onSubmit={submitHandler2}>
                <div className="teacher-form-item">
                  <h1>Delete a Teacher</h1>
                  <br />
                  <br />

                  <div className="teacher-div">
                    <label htmlFor="" className="teacher-div-label">
                      Teacher ID:{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      className="teacher-div-input"
                      onChange={(e) => setTeacherID(e.target.value)}
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
