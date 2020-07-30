import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import "./css/Order.scss"

function Order() {
  const { id } = useParams()
  const [order, setOrder] = useState()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/book/order/id=${id}`)
      .then(({ data }) => setOrder(data.order))
      .catch(({ message }) => console.log(message))
  }, [])

  if (!order) return <div></div>

  return (
    <div>
      {console.log(order)}
      <div className="order">
        <div>
          <h4>{order._id}</h4>
        </div>
        <div>
          <h5>Address</h5>
          <p>County: {order.county}</p>
          <p>City: {order.city}</p>
          <p>Street: {order.address} </p>
        </div>
      </div>
    </div>
  )
}

export default Order
