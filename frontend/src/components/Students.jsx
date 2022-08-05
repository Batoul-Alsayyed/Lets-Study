import React, { useState, useEffect } from "react";
import LoginNavbar from "./LoginNavbar";
import SimpleSlider from "./SimpleSlider";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState(null);
  let user_id = localStorage.getItem("user_id");
  const filtered_students = [];
  async function getStudents() {
    await axios.get(`http://127.0.0.1:8000/api/admin/students`).then((res) => {
      res.data.students.map((i, index) => {
        if (String(i.user_id) !== String(user_id)) {
          console.log("user id here ", i.user_id);
          filtered_students.push(i);
        }
      });
      setStudents(filtered_students);
    });
  }
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="students-page">
      <LoginNavbar />
      <p className="students-text">Choose a student: </p>
      {students && <SimpleSlider studentsarray={students} />}
    </div>
  );
}
