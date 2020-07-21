import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BooksMap } from "../components/BookMap"
import { getBooksLink } from "../components/links"
import axios from "axios"

function Wishlist() {
  const { id } = useParams()
  const [wishlist, setWishlist] = useState()
  const [books, setBooks] = useState()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/wishlist/one/${id}`)
      .then(({ data }) => {
        setWishlist(data.wishlist)
        const ids = data.wishlist.books

        axios.get(getBooksLink(`_id=${ids.join(" ")}`)).then(({ data }) => {
          setBooks(data)
        })
      })
      .catch(({ message }) => console.log(message))
  }, [])

  if (!wishlist || !books) return <div></div>

  return (
    <div className="wishlist">
      <h2 className="wishlist-title">{wishlist.name}</h2>
      <BooksMap books={books} type="wishlist" />
    </div>
  )
}

export default Wishlist
