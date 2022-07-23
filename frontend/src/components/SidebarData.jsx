import React from "react";
import * as FiIcons from "react-icons/fi";
import Student from "../images/Vector.png";
import Teacher from "../images/Teaching.png";
export const SidebarData = [
  {
    title: "Students",
    path: "/admin-students",
    icon: <img src={Student} alt="" className="admin-icons" />,
    cName: "nav-text",
  },
  {
    title: "Teachers",
    path: "/admin-teachers",
    icon: <img src={Teacher} alt="" className="admin-icons" />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/home",
    icon: <FiIcons.FiLogOut className="admin-icons" size={25} />,
    cName: "nav-text",
  },
];
