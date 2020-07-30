import React, { useState } from "react"
import { orderInputs } from "../components/variables"
import { cartLink } from "../components/links"
import Input from "../components/Input"
import { useForm } from "react-hook-form"
import axios from "axios"
import "./css/Checkout.scss"

function Checkout() {
  const [res, setRes] = useState("")
  const { register, handleSubmit, errors } = useForm()

  const totalPrice = async (cart) => {
    let sum = 0
    const { data } = await axios.get(cartLink(cart))
    data.forEach(({ price, _id }) => (sum += cart[_id] * price))
    return sum
  }

  const onSubmit = async (data) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart"))
      if (!cart) throw new Error("Cart is empty")

      data.cart = cart
      data.orderedBy =
        JSON.parse(localStorage.getItem("jwt")).user.username || "unknown"
      data.price = await totalPrice(cart)

      const url = `${process.env.REACT_APP_API_URL}/book/order`

      axios.post(url, data).then(({ data }) => {
        if (data.error) setRes({ color: "red", message: data.error })
        setRes({ color: "green", message: data.message })
        localStorage.removeItem("cart")
      })
    } catch ({ message }) {
      setRes({ color: "red", message })
    }
  }

  return (
    <div className="checkout">
      <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="checkout-title">Checkout</h4>

        {orderInputs.map((item) => (
          <Input errors={errors} register={register} type="text" name={item} />
        ))}
        <p style={{ color: res.color }}>{res.message}</p>
        <button className="btn btn-primary checkout-form-button">Order</button>
      </form>
    </div>
  )
}

export default Checkout
