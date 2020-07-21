import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import MainRouter from "./MainRouter"
import Header from "./core/Header"
import "./App.scss"

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <MainRouter />
      </Router>
    </div>
  )
}

export default App
