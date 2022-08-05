import React, { useState, useEffect } from "react";
import profile from "../images/christopher-campbell-rDEOVtE7vOs-unsplash 1.png";
import "../index.css";
import axios from "axios";
import toast from "react-hot-toast";

export default function PersonalProfile() {
  const laravel_server = "http://127.0.0.1:8000/";
  const user_id = localStorage.getItem("user_id");
  const user_type_id = localStorage.getItem("user_type_id");
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);
  const [date_of_birth, setDateOfBirth] = useState(null);
  const [studyfield, setStudyField] = useState(null);
  const [studyfield_id, setStudyFieldId] = useState(null);
  const [degree, setDegree] = useState(null);
  const [degree_id, setDegreeId] = useState(null);

  const [alldegrees, setAllDegrees] = useState(null);
  const [allfields, setAllFields] = useState(null);

  const [user, setUser] = useState({
    name: "",
    image_link: null,
    degree: "",
    study_field: "",
    // degree_id: 0,
    // studyfield_id: 0,
  });

  useEffect(() => {
    //since we have the access token in local storage
    //lets use it to retreive user info
    let access_token = localStorage.getItem("access_token");
    axios
      .get(laravel_server + `api/user/user-profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setName(res.data.name);
        setUser({
          ...user,
          name: res.data.name,
        });
        setEmail(res.data.email);
        setDateOfBirth(res.data.date_of_birth);
      });
    getDegrees();
    getStudyFields();
  }, []);
  function getDegrees() {
    axios
      .get(laravel_server + `api/admin/degrees`)
      .then((res) => {
        setAllDegrees(res.data.degrees);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getStudyFields() {
    axios
      .get(laravel_server + `api/student/fields`)
      .then((res) => {
        setAllFields(res.data.study_fields);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleAnchorClick = (event) => {
    localStorage.clear();
  };
  useEffect(() => {
    //getting user profile image
    if (user_type_id === "0") {
      axios
        .post(laravel_server + `api/student/getStudentById`, {
          user_id: user_id,
        })
        .then((res) => {
          console.log("student", res.data.student);
          if (res.data.student[0].image_link) {
            setImage(res.data.student[0].image_link);
            setUser({ ...user, image_link: res.data.student[0].image_link });
          }
          setStudyFieldId(res.data.student[0].study_fields_id);
          setDegreeId(res.data.student[0].degrees_id);
        });
    } else if (user_type_id === "2") {
      axios
        .post(laravel_server + `api/teacher/getTeacherById`, {
          user_id: user_id,
        })
        .then((res) => {
          console.log("teacher", res.data.teacher);
          if (res.data.teacher[0].image_link) {
            setImage(res.data.teacher[0].image_link);
            setUser({
              ...user,
              image_link: res.data.teacher[0].image_link,
            });
          }
          setStudyFieldId(res.data.teacher[0].study_fields_id);

          setDegreeId(res.data.teacher[0].degrees_id);
        });
    }
  }, [user_type_id, user_id, studyfield_id, degree_id]);
  useEffect(() => {
    //if degree id and study field values are set then get their corresponding names

    if (degree_id && studyfield_id) {
      //now calling get degree by id and get study field by id
      getDegreeById(degree_id);
      //now calling get studyfield by id
      getStudyFieldById(studyfield_id);
    }
  }, [studyfield_id, degree_id, degree]);

  function getStudyFieldById(studyfieldid) {
    axios
      .post(laravel_server + `api/admin/getStudyFieldById`, {
        id: studyfieldid,
      })
      .then((res) => {
        setStudyField(res.data.study_field[0].name);
        setUser({
          ...user,
          study_field: res.data.study_field[0].name,
        });
      });
  }
  function getDegreeById(degreeid) {
    axios
      .post(laravel_server + `api/admin/getDegreeById`, {
        id: degreeid,
      })
      .then((res) => {
        setDegree(res.data.degree[0].name);
        setUser({
          ...user,
          degree: res.data.degree[0].name,
        });
      });
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("user", user);
    console.log("name", name);
    var degree_id2;
    var study_field2;
    //get degree id from chosen degree + get studyfield id from chose study field
    axios
      .post("http://127.0.0.1:8000/api/admin/getDegreeByName", {
        name: user.degree,
      })
      .then((res) => {
        degree_id2 = res.data.degree[0].id;
        console.log("degree_id2", degree_id2);
      });
    axios
      .post("http://127.0.0.1:8000/api/admin/getStudyfieldByName", {
        name: user.study_field,
      })
      .then((res) => {
        study_field2 = res.data.studyfield[0].id;
        console.log("study_field2", study_field2);
      });

    setTimeout(() => {
      if (user.name === "") {
        //that means the user didnt change his/her name
        //send user type, user id, name, image link, study field id and degree id
        axios
          .put("http://127.0.0.1:8000/api/user/UpdateUserProfile", {
            name: name,
            user_id: user_id,
            user_type: user_type_id,
            study_field_id: study_field2,
            degree_id: degree_id2,
            image_link: user.image_link,
          })
          .then((res) => {
            toast.success("Your profile is updated successfully!");
          });
      } else {
        //send user data into update user info API
        axios
          .put("http://127.0.0.1:8000/api/user/UpdateUserProfile", {
            name: user.name,
            user_id: user_id,
            user_type: user_type_id,
            study_field_id: study_field2,
            degree_id: degree_id2,
            image_link: user.image_link,
          })
          .then((res) => {
            toast.success("Your profile is updated successfully!");
          });
      }
    }, 3000);
  };
  const saveFile = (e) => {
    var s;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      s = reader.result;
      setUser({ ...user, image_link: s });
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="profile">
      <p className="students-text">Account Settings</p>

      <div className="user-account">
        <div className="user-profile">
          {!image ? null : (
            <>
              <img src={image} className="user-profile-img" />{" "}
            </>
          )}

          <ul className="user-profile-links">
            <li className="user-profile-link active">
              <a href="/PersonalProfile" className="active-link">
                Profile
              </a>
            </li>
            <li className="user-profile-link">
              <a href="/chat-rooms2">Messages</a>
            </li>
            <li className="user-profile-link">
              <a href="/home" onClick={handleAnchorClick}>
                Logout
              </a>
            </li>
          </ul>
        </div>
        <form onSubmit={submitHandler}>
          <div className="user-settings">
            <div className="user-info">
              <label className="user-label">Name:</label>
              <input
                type="text"
                className="user-input"
                placeholder={name}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="user-info">
              <label className="user-label">Profile Picture:</label>
              <input
                type="file"
                className="user-input user-file-input"
                accept=".jpg, .jpeg, .png"
                onChange={saveFile}
              />
            </div>
            <div className="user-info">
              <label className="user-label">Email Address:</label>
              <input type="text" className="user-input" value={email} />
            </div>
            <div className="user-info">
              <label className="user-label">Date of Birth</label>
              <input type="text" className="user-input" value={date_of_birth} />
            </div>
            <div className="user-info">
              <label className="user-label">Study Field</label>

              {!studyfield ? null : (
                <select
                  type="text"
                  className="user-input"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      study_field: e.target.value,
                    })
                  }
                >
                  {allfields.map((i) => {
                    if (i.name === studyfield) {
                      return (
                        <option selected value={i.name}>
                          {i.name}
                        </option>
                      );
                    }
                    return <option value={i.name}>{i.name}</option>;
                  })}
                </select>
              )}
            </div>

            <div className="user-info">
              <label className="user-label">Degree</label>
              {!degree ? null : (
                <select
                  type="text"
                  className="user-input"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      degree: e.target.value,
                    })
                  }
                >
                  {alldegrees.map((i) => {
                    if (i.name === degree) {
                      return (
                        <option selected value={i.name}>
                          {i.name}
                        </option>
                      );
                    }
                    return <option value={i.name}>{i.name}</option>;
                  })}
                </select>
              )}
            </div>
            <button className="edit-profile-btn" onClick={submitHandler}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
