import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import AdminNavbar from "./AdminNavbar";
export default function AdminStudents() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin/students`)
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

  return (
    <div className="adminpanel-container">
      <AdminNavbar />
      <div className="teacher-text">
        <h1>Students</h1>
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
                  <td className="admin-teacher-img">
                    <img src={i.image_link} />
                  </td>
                  <td>{i.rate_number}</td>
                  <td>{i.longitude}</td>
                  <td>{i.latitude}</td>
                  <td>{i.degrees_id}</td>
                  <td>{i.study_fields_id}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}
