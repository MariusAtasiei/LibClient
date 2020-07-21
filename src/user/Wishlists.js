import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import axios from "axios"
import "./css/Wishlist.scss"

function Wishlist() {
  const history = useHistory()

  const [wishlists, setWishlists] = useState()

  const { user } = JSON.parse(localStorage.getItem("jwt"))

  useEffect(() => {
    if (!user) history.push("/signin")

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/wishlist/username/${user.username}`
      )
      .then(({ data: { wishlists } }) => setWishlists(wishlists))
      .catch((err) => console.log(err))
  }, [])

  if (!wishlists) return <div></div>

  return (
    <div className="wishlist-list">
      {wishlists.map((wishlist) => (
        <Link
          to={`/user/wishlist/${wishlist._id}`}
          className="wishlist-list-link"
        >
          <div className="wishlist-list-item">
            <h3>{wishlist.name}</h3>
            <p>Number of books: {wishlist.numOfBooks}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Wishlist
