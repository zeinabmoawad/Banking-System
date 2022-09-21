import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function NavBar({page}) {
  return (
    <div className='navbar'>
      <div className='navbarIcon'>
        <ul>
          <li><Link to={`./${page}`}>{page}</Link></li> 
        </ul>
      </div>
    </div>
  )
}

export default NavBar