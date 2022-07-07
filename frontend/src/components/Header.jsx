import React from 'react'
import Navbar from '../components/Navbar';
import "../index.css";
import header from  '../images/header.png'
import WhiteButton from './WhiteButton';
export default function Header() {
  return (
    <div>
        <Navbar/>   
        <div className="header-container">
        <div className="left-side">
                <div className="header-left-side-components">
                    <p className='header-p'>First Online Study Platform</p>
                    <p className='start-p'>Start your study journey with students
                        <br/> just like you or with a professional<br/> tutor.</p>
                    <div className="buttons-styling">
                    <button className='button1'>Join as a pro member</button>
                    <WhiteButton content={"Study For Free"}></WhiteButton>
                    </div>

                </div>
            </div>
            <div className="right-side">
                <div className="header-right-side-components">
                    <img src={header} />
                </div>
            </div>
        </div>
    </div>
  )
}
