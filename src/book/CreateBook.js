import React, { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import Input from "../components/Input"

function CreateBook() {
  const { register, handleSubmit, errors } = useForm()
  const [res, setRes] = useState({ message: "", color: "" })

  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      let keyData = data[key]
      const numberKeys = ["year", "amount", "pages", "price"]
      if (key === "image") {
        const lastIndex = keyData.length - 1
        keyData = keyData[lastIndex]
      } else if (numberKeys.includes(key)) {
        keyData = keyData * 1
      }

      formData.append(key, keyData)
    })

    const headers = { "content-type": "multipart/form-data" }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/book/`, formData, {
        headers,
      })

      setRes({ message: "Book succefully saved", color: "green" })
    } catch (err) {
      setRes({ message: "Book failed to save", color: "red" })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input register={register} errors={errors} name="Image" type="file" />
        <Input register={register} errors={errors} name="Title" type="text" />
        <Input register={register} errors={errors} name="Author" type="text" />
        <Input
          register={register}
          errors={errors}
          name="Description"
          type="text"
        />
        <Input
          register={register}
          errors={errors}
          name="Category"
          type="text"
        />
        <Input
          register={register}
          errors={errors}
          name="Publisher"
          type="text"
        />
        <Input register={register} errors={errors} name="Year" type="number" />
        <Input register={register} errors={errors} name="Pages" type="number" />
        <Input register={register} errors={errors} name="Price" type="number" />
        <Input
          register={register}
          errors={errors}
          name="Amount"
          type="number"
        />
        <p style={{ color: res.color }}>{res.message}</p>
        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  )
}

export default CreateBook
