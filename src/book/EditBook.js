import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import Input from "../components/Input"
import ImageUploader from "../components/ImageUploader"
import { bookLink } from "../components/links"
import { variables, inputs } from "../components/variables"

function EditBook() {
  const { register, handleSubmit, errors } = useForm()

  const history = useHistory()
  const [book, setBook] = useState()
  const [error, setError] = useState({ message: "", color: "" })
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(bookLink(id))
      .then(({ data }) => setBook(data))
      .catch((err) => console.log(err))
  }, [])

  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      const keyData = data[key]
      formData.append(
        key,
        key === "image"
          ? keyData.length
            ? keyData[keyData.length - 1]
            : book.image
          : keyData
      )
    })

    formData.append("_id", id)

    const headers = { "content-type": "multipart/form-data" }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/book/`, formData, {
        headers,
      })

      setError({ message: "Book updated succefully", color: "green" })
    } catch (err) {
      setError({ message: "Book failed to update", color: "red" })
    }
  }

  const handleClick = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/book/id=${book._id}`)

      history.push("/")
      alert("Book deleted successfully")
    } catch (err) {
      setError({ message: "Book could not be deleted", color: "red" })
    }
  }

  if (!book) return <div></div>
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ columnCount: 2 }}>
        <ImageUploader register={register} errors={errors} value={book._id} />
        {inputs.slice(1).map(({ name, type }) => (
          <Input
            register={register}
            errors={errors}
            name={name}
            type={type}
            value={book[name.toLowerCase()]}
          />
        ))}

        <p style={{ color: error.color }}>{error.message}</p>

        <input
          type="submit"
          className="btn btn-primary"
          style={{ display: "inline-block" }}
        />
        <button
          onClick={handleClick}
          className="btn btn-danger"
          style={{ display: "inline-block" }}
        >
          Delete Book
        </button>
      </form>
    </div>
  )
}

export default EditBook
