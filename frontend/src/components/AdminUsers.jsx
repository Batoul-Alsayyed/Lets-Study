import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import AdminNavbar from "./AdminNavbar";
export default function AdminUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin/users`)
      .then((res) => {
        console.log("staus = > ", res.status);
        if (res.status + "" === "200") {
          console.log("sucesssss");
          console.log(res.data.users[0].id);
          setUsers(res.data.users);
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
        <h1>Users</h1>
      </div>
      <div className="admin-table">
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>User Type Id</th>
          </tr>
          {users &&
            users.map((i, index) => {
              console.log(i);
              return (
                <tr>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td>{i.email}</td>
                  <td>{i.date_of_birth}</td>
                  <td>{i.user_type_id}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}
