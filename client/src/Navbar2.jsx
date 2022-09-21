import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
export default function Navbar2({page,Name}) {
  const SelectAndView = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();
        window.location.href = `./${page}`;
  }
  return (
    <div className='navbar'>
      <div className='navbarIcon'>
        <form onSubmit={SelectAndView}>
        
            <button type='submit'><h2>{Name}</h2></button>
        </form>
      </div>
    </div>
  )
}
