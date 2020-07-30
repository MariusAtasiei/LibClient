import React from "react"
import { Switch, Route, useLocation, Redirect } from "react-router-dom"
import CreateBook from "./book/CreateBook"
import GetBooks from "./book/GetBooks"
import Book from "./book/Book"
import EditBook from "./book/EditBook"
import Cart from "./user/Cart"
import Signin from "./user/Signin"
import Signup from "./user/Signup"
import Confirmation from "./user/Confirmation"
import Wishlists from "./user/Wishlists"
import Wishlist from "./user/Wishlist"
import Checkout from "./user/Checkout"
import History from "./user/History"
import Order from "./user/Order"
import "./App.scss"

function MainRouter() {
  const { pathname } = useLocation()

  return (
    <div className="app-main">
      {redirectPaths.includes(pathname) && <Redirect to="/" />}
      <Switch>
        <Route exact path="/" component={GetBooks} />
        <Route path="/page=:page" component={GetBooks} />
        <Route path="/search=:search" component={GetBooks} />
        <Route path="/filters/:filters" component={GetBooks} />
        <Route path="/filters" component={GetBooks} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/book/:id" component={Book} />
        <Route path="/create-book" component={CreateBook} />
        <Route path="/edit-book/:id" component={EditBook} />
        <Route path="/cart" component={Cart} />
        <Route path="/confirmation/:key" component={Confirmation} />
        <Route path="/user/wishlist/:id" component={Wishlist} />
        <Route path="/user/wishlists" component={Wishlists} />
        <Route path="/user/history" component={History} />
        <Route path="/user/order/:id" component={Order} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </div>
  )
}

const redirectPaths = ["/filters/"]

export default MainRouter
