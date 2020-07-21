import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import { bookLink, imageSrc } from "../components/links"
import { addToCart } from "../components/BookMap"
import axios from "axios"
import "./css/Book.scss"

function Book() {
  const [book, setBook] = useState()
  const [display, setDisplay] = useState("none")
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState({ color: "", message: "" })
  const jwt = JSON.parse(localStorage.getItem("jwt"))
  const user = jwt ? jwt.user : {}
  const { handleSubmit, register } = useForm()

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    axios.get(bookLink(id)).then(({ data }) => setBook(data))
  }, [])

  const addToWishlist = async (info) => {
    const { username } = user

    const sendData = {
      book: book._id,
      name: info.wishlist,
      username,
    }

    try {
      if (!sendData.name) throw new Error("Please check a wishlist")

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/wishlist/book`,
        sendData
      )

      if (data.error) throw new Error(data.error)

      const { message } = data
      setError({ message, color: "green" })
      console.log(user)
      if (!user.wishlists.includes(sendData.name)) {
        user.wishlists.push(sendData.name)
        const { token } = JSON.parse(localStorage.getItem("jwt"))
        localStorage.setItem("jwt", JSON.stringify({ token, user }))
      }
    } catch ({ message }) {
      setError({ message, color: "red" })
    }
  }

  if (!book) return <div>Book not found</div>

  console.log(display)

  return (
    <div>
      <div className="book-presentation">
        <img src={imageSrc(book)} className="book-presentation-image" />
        <div className="book-presentation-info">
          <h5>{book.title}</h5>
          <h6>{book.author}</h6>
          <h4 className="book-presentation-info-price">
            {book.price}
            <sup>00</sup> lei
          </h4>
          <button
            onClick={addToCart}
            value={book._id}
            className="btn btn-primary book-presentation-button"
          >
            Add to Cart
          </button>
          <button
            onClick={(ev) => {
              ev.preventDefault()
              if (!user.username) history.push("/signin")

              setDisplay("block")
            }}
            value={book._id}
            className="btn btn-primary book-presentation-button"
          >
            Add to wishlist
          </button>
        </div>
      </div>
      <div className="book-description">
        <h4 className="book-description-title">Description</h4>
        <p className="book-description-text">{book.description}</p>
      </div>
      <div className="book-details">
        <h4 className="book-details-title">Details</h4>
        {["title", "author", "category", "pages", "publisher", "year"].map(
          (item) => (
            <div className="book-details-spec">
              <p className="book-details-spec-item">
                {item[0].toUpperCase() + item.slice(1, item.length)}
              </p>
              <p className="book-details-spec-info">{book[item]}</p>
            </div>
          )
        )}
      </div>
      <div
        style={{
          display,
        }}
        className="book-wishlist"
      >
        <div className="book-wishlist-top">
          <h2>Add to wishlist</h2>
          <button
            onClick={(ev) => {
              ev.preventDefault()
              setDisplay("none")
            }}
            className="book-wishlist-top-button"
          >
            <span>X</span>
          </button>
        </div>
        <form
          onSubmit={handleSubmit(addToWishlist)}
          className="book-wishlist-form"
        >
          {user.wishlists &&
            user.wishlists.map((wishlist) => (
              <div>
                <input
                  type="radio"
                  value={wishlist}
                  name="wishlist"
                  id={wishlist}
                  ref={register}
                />
                <label htmlFor={wishlist} className="book-wishlist-form-label">
                  {wishlist}
                </label>
              </div>
            ))}
          <input
            type="radio"
            name="wishlist"
            id="write"
            value={inputValue}
            ref={register}
          />
          <label for="write" className="book-wishlist-form-label">
            <input
              type="text"
              onChange={({ target: { value } }) => setInputValue(value)}
              className="book-wishlist-form-input"
            />
          </label>
          <p style={{ color: error.color }}>{error.message}</p>
          <button className="btn btn-primary book-wishlist-form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Book
