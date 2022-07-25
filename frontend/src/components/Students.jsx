import React, { useState, useEffect } from "react";
import LoginNavbar from "./LoginNavbar";
import SimpleSlider from "./SimpleSlider";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState(null);
  async function getStudents() {
    await axios
      .get(`http://127.0.0.1:8000/api/admin/students`)
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="students-page">
      <LoginNavbar />
      <p className="students-text">Choose a student to study with: </p>
      {students && <SimpleSlider studentsarray={students} />}
    </div>
  );
}
