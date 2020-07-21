import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { imageSrc } from "./links"
import "./css/Books.scss"

const getTitle = ({ title }) => {
  let titlu = title.substring(0, 70).split(" ")
  titlu.pop()
  titlu = titlu.join(" ")
  const lastChar = titlu[titlu.length - 1]

  if ([",", ".", ":"].includes(lastChar)) titlu = titlu.slice(0, -1)

  return titlu
}

export const addToCart = (ev) => {
  ev.preventDefault()

  const { value } = ev.target
  let cart = JSON.parse(localStorage.getItem("cart"))

  if (cart === null) cart = { [value]: 1 }
  else if (cart[value] === undefined) cart[value] = 1
  else cart[value] += 1

  localStorage.setItem("cart", JSON.stringify(cart))
}

const numberList = (num) => {
  let list = [1]
  for (let i = 2; i < num; ++i) list.push(i)
  return list
}

export const BooksMap = ({ books, type }) => {
  console.log(books)
  return (
    <div className="books-parent">
      {books.map((book) => (
        <Book book={book} type={type} />
      ))}
    </div>
  )
}

const Book = ({ book, type }) => {
  const history = useHistory()

  const handleClick = ({ target }) => {
    const { value } = target
    const cart = JSON.parse(localStorage.getItem("cart"))
    delete cart[value]
    localStorage.setItem("cart", JSON.stringify(cart))
    history.go()
  }

  const handleChange = ({ target }) => {
    const cart = JSON.parse(localStorage.getItem("cart"))
    cart[book._id] = target.value * 1
    localStorage.setItem("cart", JSON.stringify(cart))
    book.requestedAmount = target.value * 1
    setPrice(book.requestedAmount * book.price)
  }

  const [price, setPrice] = useState(book.requestedAmount * book.price)

  return (
    <div className={`book${type === "home" ? "" : "-cart"}`}>
      <Link
        to={`/book/${book.id}`}
        style={{ color: "black" }}
        className="book-link"
      >
        <img src={imageSrc(book)} className="book-link-img" />
      </Link>
      <div className="book-link-div">
        <Link
          to={`/book/${book.id}`}
          style={{ color: "black" }}
          className="book-link"
        >
          <h4 className="book-link-title">{getTitle(book)}</h4>
          <h6 className="book-link-author">{book.author}</h6>
        </Link>

        {type === "home" || type === "wishlist" ? (
          <>
            <p>
              {book.price}
              <sup>00</sup> lei
            </p>
            <button
              onClick={addToCart}
              value={book._id}
              className="btn btn-primary"
            >
              Add cart
            </button>
          </>
        ) : (
          <div className="book-cart-info">
            <div>
              <p className="book-cart-info-details">Amount: </p>
              <select
                defaultValue={book.requestedAmount}
                onChange={handleChange}
                className="form-control book-cart-info-select"
              >
                {numberList(book.amount).map((number) => (
                  <option>{number}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="book-cart-info-details">Price: </p>
              <p>
                {price}
                <sup>00</sup> lei
              </p>
            </div>
            <button
              onClick={handleClick}
              value={book._id}
              className="btn btn-danger book-cart-info-delete"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
