import React from "react"

function Input({ name, type, register, errors, value }) {
  const lowercaseName = name.toLowerCase()

  return (
    <div style={{ maxWidth: 400 }}>
      <label name={lowercaseName}>{name}</label>
      {name !== "Description" ? (
        <input
          type={type}
          name={lowercaseName}
          ref={register({
            required: `${name} required`,
          })}
          className="form-control"
          accept={type === "file" ? "image/*" : null}
          defaultValue={value ? value : null}
        />
      ) : (
        <textarea
          type={type}
          name={lowercaseName}
          ref={register({
            required: `${name} required`,
          })}
          className="form-control"
          accept={type === "file" ? "image/*" : null}
          defaultValue={value ? value : null}
        />
      )}

      {errors[lowercaseName] && (
        <p style={{ color: "red" }}>{errors[lowercaseName].message}</p>
      )}
    </div>
  )
}

export default Input
