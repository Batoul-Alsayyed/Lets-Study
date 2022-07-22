import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import Student from "../images/Vector.png";
import Teacher from "../images/Teaching.png";
export const SidebarData = [
  {
    title: "Dashboard",
    icon: <AiIcons.AiOutlineHome className="admin-icons" size={25} />,
    cName: "nav-text",
  },

  {
    title: "Students",
    icon: <img src={Student} alt="" className="admin-icons" />,
    cName: "nav-text",
  },
  {
    title: "Teachers",
    icon: <img src={Teacher} alt="" className="admin-icons" />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    icon: <FiIcons.FiLogOut className="admin-icons" size={25} />,
    cName: "nav-text",
  },
];
