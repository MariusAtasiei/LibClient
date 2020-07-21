import React from "react"
import { useHistory, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import UserDropdown from "../components/UserDropdown"
import "./css/Header.scss"

function Header() {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  const onSubmit = ({ search }) => {
    if (search) history.push(`/search=${search}`)
    else history.push(`/`)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link
        style={{ color: "white", textDecoration: "none", marginRight: 10 }}
        to="/"
        className="navbar-logo"
      >
        <img
          src={`${process.env.PUBLIC_URL}/images.png`}
          className="navbar-logo-img"
        />
        <p className="navbar-logo-text">OnlineLibrary</p>
      </Link>

      <div className="navbar-search">
        <form className="navbar-search-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Search.."
            name="search"
            className="navbar-search-form-input"
            ref={register}
          />
          <button type="submit" className="navbar-search-form-button">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
      <div className="navbar-icons">
        <UserDropdown />

        <Link to="/cart" className="navbar-icons-link">
          <i className="fa fa-shopping-cart navbar-icons-link-icon" />
        </Link>
      </div>
    </nav>
  )
}

export default Header
