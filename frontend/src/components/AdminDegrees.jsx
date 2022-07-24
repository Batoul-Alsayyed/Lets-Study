import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import AdminNavbar from "./AdminNavbar";
export default function AdminDegrees() {
  const [data, setData] = useState(null);

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
              console.log(i);
              return (
                <tr>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}
