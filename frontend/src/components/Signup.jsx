import React from 'react'
import img6  from '../images/Online Reading.png'
import SignupButton from './SignupButton'
export default function Signup() {
  return (
    <div className='signup-layout'>
      <div className='left-display'>
        <img src={img6} alt="" />
        <p className='signup-text'>Not a member? Register now</p>
      </div>
      <div className='right-display'>
        <p className='welcome'>Welcome to Lets Study</p>
        <label>Email</label>
        <input type="text" />
        <label htmlFor="">Password</label>
        <input type="password" />
        <SignupButton content={'Sign up'}></SignupButton>
      </div>

    </div>
  )
}
