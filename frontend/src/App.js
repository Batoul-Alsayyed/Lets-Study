import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import StudentsSection from './components/StudentsSection';
import Homepage from './components/Homepage';
import BookNow from './components/BookNow';
import Footer from './components/Footer';
import Signup from './components/Signup';
function App() {
  return (
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/navbar' element={<Navbar/>}></Route>
          <Route path='/header' element={<Header/>}></Route>
          <Route path='/students-section' element={<StudentsSection/>}></Route>
          <Route path='/home' element={<Homepage/>}></Route>
          <Route path='/book' element={<BookNow/>}></Route>
          <Route path='/footer' element={<Footer/>}></Route>
          <Route path='/Signup' element={<Signup/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App;
