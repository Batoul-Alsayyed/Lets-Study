import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
  return (
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/navbar' element={<Navbar/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App;
