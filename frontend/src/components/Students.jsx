import React from 'react'
import LoginNavbar from './LoginNavbar'
import SimpleSlider from './SimpleSlider';
import Card from '../components/Card';
export default function Students() {
  return (
    <div className='students-page'>
        <LoginNavbar/>
      <p className='students-text'>Choose a student to study with: </p>
      <SimpleSlider/>      
    </div>
    
  )
}
