import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { BooksMap } from "../components/BookMap"
import { getBooksLink } from "../components/links"
import Filters from "./Filters"
import "./css/Books.scss"

function GetBooks() {
  const [books, setBooks] = useState([])
  const { search, filters } = useParams()

  useEffect(() => {
    const url = getBooksLink(filters, search)

    axios
      .get(url)
      .then(({ data }) => setBooks(data))
      .catch((err) => console.log(err.message))
  }, [search, filters])

  return (
    <div className="books col=9">
      <Filters />

      <BooksMap books={books} type="home" />
    </div>
  )
}

export default GetBooks
