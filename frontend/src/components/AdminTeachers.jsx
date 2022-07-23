import React from "react";
import "../index.css";
import AdminNavbar from "./AdminNavbar";

export default function AdminTeachers() {
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
            <th>image_link</th>
            <th>rate_number</th>
            <th>longitude</th>
            <th>latitude</th>
            <th>degrees_id</th>
            <th>study_fields_id</th>
          </tr>
          <tr>
            <td>1</td>
            <td>link</td>
            <td>rate</td>
            <td>rate</td>
            <td>rate</td>
            <td>rate</td>
            <td>rate</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
