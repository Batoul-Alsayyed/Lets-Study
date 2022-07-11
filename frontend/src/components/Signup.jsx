import React from 'react'
import img6  from '../images/Online Reading.png'
import SignupButton from './SignupButton'
import '../index.css'
export default function Signin() {
  return (
    <div className='signin-layout'>
    <div className='signin-left-display'>
      <img className='signin-img' src={img6} alt="" />
      <p className='signup-text'>Already a member? Sign in</p>
    </div>
    <div className='signin-right-display'>
      <p className='signin-welcome'>Welcome to Lets Study</p>
      <label className='signin-label'>Name</label>
      <input className='signin-input' type="text" />
      <label className='signin-label'>Email</label>
      <input className='signin-input' type="email" />
      <label className='signin-label'>Password</label>
      <input className='signin-input' type="password" />
      
      <label className='signin-label'>Confirm Password</label>
      <input className='signin-input' type="password" />
      
      <label className='signin-label'>Date of Birth</label>
      <input className='signin-input' type="date" />
     
      <SignupButton content={'Sign in'}></SignupButton>
    </div>
  </div>
  );
}
