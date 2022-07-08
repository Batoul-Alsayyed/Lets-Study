import React from 'react'
import img6  from '../images/Online Reading.png'
import SignupButton from './SignupButton'
export default function Signup() {
  return (
    <div className='signup-layout'>
      <div className='signup-left-display'>
        <img className='signup-img' src={img6} alt="" />
        <p className='signup-text'>Not a member? Register now</p>
      </div>
      <div className='signup-right-display'>
        <p className='signup-welcome'>Welcome to Lets Study</p>
        <label className='signup-label'>Email</label>
        <input className='signup-input' type="text" />
        <label className='signup-label'>Password</label>
        <input className='signup-input' type="password" />
        <SignupButton content={'Sign up'}></SignupButton>
      </div>
    </div>
  )
}
