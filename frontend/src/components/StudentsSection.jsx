import React from 'react'
import '../index.css'
import student1 from '../images/asian-college-student-400x400 1.png'
import student2 from '../images/christopher-campbell-rDEOVtE7vOs-unsplash 1.png'
import student3 from '../images/matthias_135551977 1.png'
export default function StudentsSection() {
  return (
    <div className='students-section'>
      <div><p>Study with different people from  
        <br/>    all around the world.</p>
        <div className="students-imgs">
            <img src={student1} alt="" />
            <img src={student2} alt="" />
            <img src={student3} alt="" />
        </div>
        </div>
    </div>
  )
}
