import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

function Confirmation() {
  const [message, setMessage] = useState()
  const { key } = useParams()

  useEffect(() => {
    console.log("ok")
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/confirmation/${key}`)
      .then(({ data }) => setMessage(data))
  }, [])

  return (
    <div style={{ margin: "200px auto", width: 400 }}>
      <h1 className="text-center">{message}</h1>
      <Link
        to="/signin"
        className="btn btn-primary"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Go to sign in
      </Link>
    </div>
  )
}

export default Confirmation
