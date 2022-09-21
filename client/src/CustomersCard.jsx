import React from 'react'
import { useState, useEffect } from 'react'
function CustomersCard({ Customer }) {


  const [Customers, setCustomers] = useState({})

  useEffect(() => {
    if (Customer) {
      setCustomers(Customer)
    }
  }, [])

  return (
    <div>
      {Customer?<div className='card'>
      <h2>🧑{Customers.Name}</h2>
      <div>
        <p>📱Mobile: {Customers.Mobile}</p>
        <p>📧Email: {Customers.Email}</p>
        <p>💳AccountNum: {Customers.AccountNum}</p>
        <p>💰Balance: {Customers.Balance} LE</p>
      </div>
      </div>
        : <h1>loading.....</h1>}

    </div>
  )
}

export default CustomersCard
