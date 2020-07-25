import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { imageSrc } from "./links"
import "./css/Books.scss"

export const getTitle = ({ title }) => {
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
  const jwt = JSON.parse(localStorage.getItem("jwt"))
  const username = jwt ? jwt.user.username : null

  return (
    <div className={`book${type === "home" ? "" : "-wishlist"}`}>
      <Link to={`/book/${book.id}`} className="book-link">
        <img src={imageSrc(book)} className="book-link-img" />
      </Link>
      <div className="book-link-div">
        <Link
          to={`/book/${book.id}`}
          style={{ color: "black" }}
          className="book-link"
        >
          <h4 className="book-link-title">{book.title}</h4>
          <h6 className="book-link-author">{book.author}</h6>
        </Link>

        <p>
          {book.price}
          <sup>00</sup> lei
        </p>

        {username === "admin" && type === "home" ? (
          <Link to={`/edit-book/${book._id}`} className="btn btn-primary">
            Edit Book
          </Link>
        ) : (
          <button
            onClick={addToCart}
            value={book._id}
            className={`btn btn-primary ${
              type === "wishlist" ? "book-link-div-button" : null
            }`}
          >
            Add cart
          </button>
        )}
      </div>
    </div>
  )
}
