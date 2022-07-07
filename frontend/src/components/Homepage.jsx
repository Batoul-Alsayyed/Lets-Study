import React from 'react'
import Header from '../components/Header';
import StudentsSection from './StudentsSection';
import BookNow from './BookNow';
import Footer from './Footer';
export default function Homepage() {
  return (
    <div>
      <Header/>
      <StudentsSection/>
      <BookNow/>
      <Footer/>
    </div>
  )
}
