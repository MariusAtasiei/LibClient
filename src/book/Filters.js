import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { filtersLink } from "../components/links"
import axios from "axios"

import "./css/Filters.scss"

function Filters() {
  const [filters, setFilters] = useState({
    price: ["0-50", "50-100", "100-200", "200-500", "500-1000"],
  })
  const [data, setData] = useState({})
  const [display, setDisplay] = useState("none")
  const history = useHistory()

  useEffect(() => {
    axios.get(filtersLink).then(({ data }) => {
      setFilters({ ...filters, ...data })
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    setDisplay("none")
    let filtering = Object.keys(data)
      .map((key) => {
        const keyData = data[key]
        return keyData.length > 0 ? `${key}=${data[key].join(",")}` : ""
      })
      .join("&")

    if (filtering[0] === "&") filtering = filtering.substring(1)
    if (filtering[filtering.length - 1] === "&")
      filtering = filtering.slice(0, -1)

    history.push(filtering.split("=")[1] !== "" ? `/filters/${filtering}` : "/")
  }

  const handleChange = ({ target }) => {
    const [key, filter] = target.value.split("=")

    if (data[key] && key !== "price") {
      if (data[key].includes(filter)) data[key].pop(filter)
      else data[key].push(filter)
    } else data[key] = [filter]
  }

  const filtersHTML = (
    <div className="filters">
      <button
        style={{ display }}
        onClick={() => setDisplay(display === "none" ? "block" : "none")}
        className="filters-button-cancel"
      >
        <span>x</span>
      </button>
      <form onSubmit={handleSubmit}>
        {Object.keys(filters).map((key) => (
          <div className="filters-group">
            <label htmlFor={key}>{`${key[0].toUpperCase()}${key.slice(
              1
            )}`}</label>
            {filters[key].map((filter) => (
              <div className="form-check">
                <input
                  type={key === "price" ? "radio" : "checkbox"}
                  name={key}
                  defaultValue={data[key] ? data[key].includes(filter) : false}
                  value={`${key}=${filter}`}
                  onChange={handleChange}
                  defaultChecked={
                    data[key] ? data[key].includes(filter) : false
                  }
                  className="form-check-input"
                />
                <label htmlFor={key} className="form-check-label">
                  {filter}
                </label>
              </div>
            ))}
          </div>
        ))}
        <input
          type="submit"
          value="Filter"
          className="btn btn-info filters-submit"
        />
      </form>
    </div>
  )

  if (!filters.author) return <div></div>

  return (
    <>
      <button
        className="filters-button"
        onClick={() => setDisplay(display === "none" ? "block" : "none")}
      >
        Filters
      </button>

      <div className="filters-parent col-3">{filtersHTML}</div>

      <div className="filters-parent-mobile col-12" style={{ display }}>
        {filtersHTML}
      </div>
    </>
  )
}

export default Filters
