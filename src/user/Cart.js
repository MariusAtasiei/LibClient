import React, { useState, useEffect } from "react"
import axios from "axios"
import { BooksMap } from "../components/BookMap"
import { cartLink } from "../components/links"

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")))
  const [books, setBooks] = useState()

  useEffect(() => {
    axios.get(cartLink(cart)).then(({ data }) => {
      data.forEach((book) => {
        book.requestedAmount = cart[book._id]
      })
      setBooks(data)
    })
  }, [])

  if (!books) return <div></div>

  console.log(books)

  return (
    <>
      <BooksMap books={books} type="cart" />
      <p>
        Total price:{" "}
        {/* {books
          .map((book) => [book.requestedAmount, book.price])
          .reduce((acc, curr) => {
            console.log({ curr, acc })
            return curr[0] * curr[1] + acc
          })} */}
      </p>
    </>
  )
}

export default Cart
