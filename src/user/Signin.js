import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory, Link } from "react-router-dom"
import axios from "axios"
import Input from "../components/Input"
import "./css/Form.scss"

function Signin() {
  const { register, handleSubmit, errors } = useForm()
  const [message, setMessage] = useState({ text: null, color: "green" })
  const history = useHistory()

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signin`,
        formData
      )

      if (data.error) throw new Error(data.error)

      localStorage.setItem("jwt", JSON.stringify(data))

      history.push("/")
    } catch ({ message }) {
      setMessage({
        text: message,
        color: "red",
      })
    }
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Signin</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="Username"
          register={register}
          errors={errors}
        />
        <Input
          type="password"
          name="Password"
          register={register}
          errors={errors}
        />
        <p style={{ color: message.color }}>{message.text}</p>
        <div>
          <button className="btn btn-raised btn-primary">Submit</button>
          <Link className="btn btn-raised btn-primary" to="/signup">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signin
