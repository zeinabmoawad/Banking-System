import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VeiwAllCustomers from './VeiwAllCustomers.jsx';
import NavBar from './NavBar';
import Navbar2 from './Navbar2.jsx';
import SelectAndView from './SelectAndView.jsx';
function Home() {
  return (
    <div>
    <Navbar2 page={"AllCustomers"} Name={"AllCustomers"} ></Navbar2>
    <Navbar2 page={"SelectAndView"}  Name={"Transfer Operation"}></Navbar2>
<Routes>
<Route path='/AllCustomers' element={<VeiwAllCustomers/>}></Route>
<Route path='/SelectAndView' element={<SelectAndView></SelectAndView>}></Route>
      </Routes>
      <div className='titleinhome'><h1>🏦 Welcome To Our Banking System 🏦</h1></div>
    </div>
  )
}

export default Home