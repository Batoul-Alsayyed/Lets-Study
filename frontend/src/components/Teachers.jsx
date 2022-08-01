import React, { useState, useEffect } from "react";
import LoginNavbar from "./LoginNavbar";
import SimpleSlider from "./SimpleSlider";
import axios from "axios";

export default function Students() {
  const [teachers, setTeachers] = useState(null);
  async function getTeachers() {
    await axios
      .get(`http://127.0.0.1:8000/api/admin/teachers`)
      .then((res) => {
        setTeachers(res.data.teachers);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className="students-page">
      <LoginNavbar />
      <p className="students-text">Choose a Teacher : </p>
      {teachers && <SimpleSlider studentsarray={teachers} />}
    </div>
  );
}
