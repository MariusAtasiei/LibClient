import React from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import "../core/css/Header.scss"

function UserDropdown() {
  const history = useHistory()
  const { pathname } = useLocation()

  const auth = localStorage.getItem("jwt") !== null

  const signout = () => {
    localStorage.removeItem("jwt")
    if (pathname === "/") history.go()
    else history.push("/")
  }

  return (
    <div className="dropdown show ">
      <a
        className="navbar-icons-link"
        role="button"
        href="#"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fa fa-user navbar-icons-link-icon" aria-hidden="true" />
      </a>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {auth ? (
          <>
            <Link className="dropdown-item" to="/user/wishlists">
              Wishlist
            </Link>
            <Link className="dropdown-item" to="signin">
              History
            </Link>
            <Link className="dropdown-item" onClick={signout}>
              Sign out
            </Link>
          </>
        ) : (
          <>
            <Link className="dropdown-item" to="/signin">
              Sign in
            </Link>
            <Link className="dropdown-item" to="/signup">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default UserDropdown
