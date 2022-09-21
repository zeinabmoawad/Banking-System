import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CustomersCard from './CustomersCard.jsx'
import NavBar from './NavBar.jsx'
import SelectAndView from './SelectAndView.jsx'
import Home from './Home.jsx'
import Navbar2 from './Navbar2.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function VeiwAllCustomers() {
    const [Customers, setCustomers] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:50000/FindCustomers`).then((response) => {
            if (response.data.status == -1) {
                alert(response.data.Message)
                return
            }
            setCustomers(response.data)

            console.log(response.data)
        })

    }, [])

    return (
        <div>
            <Navbar2 page={""} Name={"Home"}></Navbar2>
            <Navbar2 page={"SelectAndView"} Name={"Transfer Operation"}></Navbar2>
            {/* <Routes>
                <Route path='/AllCustomers/SelectAndView' element={<SelectAndView/>}></Route>
                <Route path='/' element={<Home/>}></Route>
            </Routes> */}
            <div className='customerHeader'><h2>Customers</h2></div>
            <hr />
            {Customers ? (Customers.map((Customer) => {
                return <CustomersCard Customer={Customer}></CustomersCard>
            })) : <p>Loading Customers....</p>}
        </div >
    )
}

export default VeiwAllCustomers