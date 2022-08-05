import React, { useState, useEffect } from "react";
import LoginNavbar from "./LoginNavbar";
import SimpleSlider from "./SimpleSlider";
import axios from "axios";

export default function Students() {
  const [teachers, setTeachers] = useState(null);
  let user_id = localStorage.getItem("user_id");
  const filtered_teachers = [];
  async function getTeachers() {
    await axios.get(`http://127.0.0.1:8000/api/admin/teachers`).then((res) => {
      res.data.teachers.map((i, index) => {
        if (String(i.user_id) !== String(user_id)) {
          console.log("user id here ", i.user_id);
          filtered_teachers.push(i);
        }
      });
      console.log("Filtered teachers=>", filtered_teachers);
      setTeachers(filtered_teachers);
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
