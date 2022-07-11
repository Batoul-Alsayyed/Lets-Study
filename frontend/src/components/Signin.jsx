import React, {useState} from 'react'
import axios from 'axios';
import img6  from '../images/Online Reading.png'
import SignupButton from './SignupButton'
import {useNavigate } from "react-router-dom"

export default function Signup() {
  let navigate = useNavigate();

  const [user,setUser] = useState({email:"", password:""});
  const [details, setDetails] = useState({name:"", email:"", password:""});
  
  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  }
  const Login = details => {
    axios.post(`http://127.0.0.1:8000/api/user/login`, {email: details.email, password: details.password}
    ).then(res => {
      console.log(res);
      setUser({
            email: details.email
          });
          navigate('/students')
    }).catch(err => {
      console.log(err);
      alert('Wrong email or password!')
  });
  }
  return (
    <div className='signup-layout'>
      <div className='signup-left-display'>
        <img className='signup-img' src={img6} alt="" />
        <p className='signup-text'>Not a member? Register now</p>
      </div>
      <form className='signup-right-display' onSubmit={submitHandler}>
        <p className='signup-welcome'>Welcome to Lets Study</p>
        <label className='signup-label'>Email</label>
        <input className='signup-input' type="text" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
        <label className='signup-label'>Password</label>
        <input className='signup-input' type="password" id="password"  onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
        <SignupButton type="submit" content={'Sign up'}></SignupButton>
      </form>
    </div>
  )
}
