import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import axios from "axios"
import "./css/History.scss"

function History() {
  const history = useHistory()
  const [orders, setOrders] = useState()

  const jwt = JSON.parse(localStorage.getItem("jwt"))
  if (!jwt) history.push("/signin")
  const { user } = jwt

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/book/order?user=${user.username}`)
      .then(({ data }) => setOrders(data.orders))
      .catch(({ message }) => console.log(message))
  }, [])

  if (!orders) return <div></div>

  return (
    <div>
      {orders.map(({ _id, price, status, numOfBooks }) => (
        <Link to={`/user/order/${_id}`} className="order-list-link">
          <div className="order-list-item1">
            <h3>{_id}</h3>
            <p>Number of books: {numOfBooks}</p>
          </div>
          <div className="order-list-item2">
            <p>
              Total: {price}
              <sup>00</sup> RON
            </p>
            <p style={{ color: status === "Processing" ? "#c96800" : "green" }}>
              Status: {status}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default History
