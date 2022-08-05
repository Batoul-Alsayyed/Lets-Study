import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";

import "../index.css";
import logo from "../images/logo/logo.png";
import { IconContext } from "react-icons";

function AdminNavbar() {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    console.log("sidebar", sidebar);
  }, [sidebar]);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar-admin">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} color="#1a83ff" />
          </Link>
          <div className="admin-text">
            <h1>Admin Panel</h1>
          </div>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <h1 className="navbar-text">Lets Study</h1>
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              if (item.title === "Logout") {
                return (
                  <li
                    key={index}
                    className={item.cName}
                    onClick={localStorage.clear()}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default AdminNavbar;
