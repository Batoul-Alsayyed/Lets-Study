import React from 'react'
import '../index.css'
import { ImTwitter } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";

import { FaRegEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <div className='students-section'>
      <div className="footer-items">
      <div>Contact Us</div>
      <div>Lets Study @2022 copyrights</div>
      <div>Social Media</div>
      <div className='footer-icons'>
        <ImTwitter/>
        <FaInstagram/>
        <FaRegEnvelope/>
      </div>
      </div>
    </div>
  )
}
