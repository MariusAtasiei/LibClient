import React, { useState, useEffect } from "react"
import axios from "axios"
import { BooksMap, getTitle } from "../components/BookMap"
import { cartLink, imageSrc } from "../components/links"
import { Link, useHistory } from "react-router-dom"
import "./css/Cart.scss"

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")))
  const [books, setBooks] = useState()
  const history = useHistory()

  useEffect(() => {
    if (cart) {
      axios.get(cartLink(cart)).then(({ data }) => {
        data.forEach((book) => {
          book.requestedAmount = cart[book._id]
        })
        setBooks(data)
      })
    }
  }, [])

  // const getAmountSelector = ({ requestedAmount, amount, _id }) => (
  //   <select
  //     defaultValue={requestedAmount}
  //     onChange={({ target }) => {
  //       const cart = JSON.parse(localStorage.getItem("cart"))
  //       cart[_id] = target.value * 1
  //       localStorage.setItem("cart", JSON.stringify(cart))
  //       requestedAmount = target.value * 1
  //       setCart(localStorage.getItem("cart"))
  //     }}
  //     className="form-control book-cart-info-select"
  //   >
  //     {numberList(amount).map((number) => (
  //       <option>{number}</option>
  //     ))}
  //   </select>
  // )

  const totalPrice = (books) => {
    let sum = 0
    books.forEach((book) => (sum += book.requestedAmount * book.price))
    return sum
  }

  const getPrice = ({ requestedAmount, price }) => requestedAmount * price

  const numberList = (num) => {
    let list = [1]
    for (let i = 2; i < num; ++i) list.push(i)
    return list
  }

  const handleClick = ({ target }) => {
    const { value } = target
    const cart = JSON.parse(localStorage.getItem("cart"))
    delete cart[value]
    localStorage.setItem("cart", JSON.stringify(cart))
    history.go()
  }

  if (!cart) return <div>Cart is empty</div>
  else if (!books) return <div></div>

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Book</th>
            <th scope="col">Amount</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr className="table-row">
              <td className="table-row-book">
                <Link
                  className="table-row-book-link"
                  to={`/book/${book.title.toLowerCase().split(" ").join("-")}`}
                >
                  <div className="table-row-book-image-div">
                    <img
                      src={imageSrc(book)}
                      className="table-row-book-image"
                    />
                  </div>
                  <div className="table-row-book-div">
                    <p className="table-row-book-title">{getTitle(book)}</p>
                    <button
                      onClick={handleClick}
                      value={book._id}
                      className="btn btn-danger book-cart-info-delete table-row-book-button"
                    >
                      Delete
                    </button>
                  </div>
                </Link>
              </td>
              <td>
                <div className="table-info">
                  {
                    <select
                      defaultValue={book.requestedAmount}
                      onChange={({ target }) => {
                        const cart = JSON.parse(localStorage.getItem("cart"))
                        cart[book._id] = target.value * 1
                        localStorage.setItem("cart", JSON.stringify(cart))
                        book.requestedAmount = target.value * 1
                        setCart(JSON.parse(localStorage.getItem("cart")))
                      }}
                      className="form-control book-cart-info-select"
                    >
                      {numberList(book.amount).map((number) => (
                        <option>{number}</option>
                      ))}
                    </select>
                  }
                </div>
              </td>
              <td>
                <p className="table-info">
                  {getPrice(book)}
                  <sup>00</sup> RON
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Total price: {totalPrice(books)}
        <sup>00</sup> RON
      </p>
    </>
  )
}

export default Cart
