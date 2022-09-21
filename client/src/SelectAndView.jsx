import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar2 from './Navbar2'
import Home from './Home'
import VeiwAllCustomers from './VeiwAllCustomers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function SelectAndView() {

  const [CustomerIDTo, SetCustomerIDTo] = useState("")
  const [CustomerIDFrom, SetCustomerIDFrom] = useState("")
  const [Amount, SetAmount] = useState(0)
  const [Customers, setCustomers] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/FindCustomers").then((response) => {
      if (response.data.status == -1) {
        alert(response.data.Message)
        return
      }
      setCustomers(response.data)

      console.log(response.data)
    })

  }, [])



  const SelectAndView = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();
    if (CustomerIDTo === "default" || CustomerIDFrom === "default" || Amount === 0) {
      alert("Fill all Feild")
      return;
    }
    else {

      axios.put("http://localhost:5000/Transfer", { Customer_ID_From: CustomerIDFrom, Customer_ID_To: CustomerIDTo, Amount: Amount }).then((response) => {
        // console.log(response.data) 
        if (response.data.status === -1) {
          console.log("err")
          alert(response.data.err)
          return;
        }
        else if (response.data.status === 404) {
          console.log("404")
          alert(response.data.Message)
          return;
        }
        alert(response.data.Message)
        window.location.href = './AllCustomers';
      }, [])
    }
  }
  return (
    <div >
      <Navbar2 page={""} Name={"Home"}></Navbar2>
      <Navbar2 page={"AllCustomers"} Name={"AllCustomers"} ></Navbar2>
      {/* <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/AllCustomers' element={<VeiwAllCustomers />}></Route>
      </Routes> */}
      <h2 className='customerHeader'>Transfer Operation</h2>
      <hr />
      <form onSubmit={SelectAndView}>
        {/* Name */}
        <div className='RowProfileAdmin'>
          <div className='tranfercard'>
            <h3> 👐Tranfer From Customer👐</h3>
            <select defaultValue="default" onChange={(e) => {
              SetCustomerIDFrom(e.target.value)
            }
            }>
              <option value="default" disabled>Select Customer</option>
              {Customers ? Customers.map((Customer) => {
                return (<option value={Customer._id} key={Customer._id}>{Customer.Name}</option>)
              }) : null}
            </select><br></br>

            <h3> 👊Tranfer To Customer👊</h3>
            <select defaultValue="default" onChange={(e) => {
              SetCustomerIDTo(e.target.value)
            }
            }>
              <option value="default" disabled>Select Customer</option>
              {Customers ? Customers.map((Customer) => {
                return (<option value={Customer._id} key={Customer._id}>{Customer.Name}</option>)
              }) : null}
            </select><br></br>
            <h3> 💰Amount of Money💰</h3>
            <input type="text" placeholder="enter amount of money"
              onChange={(event) => {
                SetAmount(Number(event.target.value))
              }} ></input><br></br><br></br>

            <div className="ProfileButtonsAdmin">
              <button type='submit'>💸Transfer💸</button><br></br><br></br>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SelectAndView