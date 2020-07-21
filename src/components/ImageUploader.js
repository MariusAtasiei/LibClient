import React from "react"

function Input({ register, errors, value }) {
  const [image, setImage] = React.useState()

  const handleChange = ({ target }) => {
    if (target.files) {
      const { files } = target
      const img = files[files.length - 1]
      if (img) setImage(URL.createObjectURL(img))
    }
  }

  const imageSrc = image
    ? image
    : value
    ? `${process.env.REACT_APP_API_URL}/book/image/${value}`
    : null

  return (
    <>
      <label name="image">Image</label>
      <input
        type="file"
        name="image"
        ref={register({
          required: value ? false : `Image required`,
        })}
        className="form-control-file"
        accept="image/*"
        onChange={handleChange}
      />

      <img
        src={imageSrc}
        style={{ height: 100, display: image || value ? "block" : "none" }}
      />

      {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
    </>
  )
}

export default Input
