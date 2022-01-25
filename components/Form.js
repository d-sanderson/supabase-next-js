import React, { Fragment } from "react"

const Form = ({
  handleSubmit,
  fields = [
    { name: "email", type: "email" },
    { name: "password", type: "password" },
  ],
  submitText,
}) => (
  <form onSubmit={handleSubmit}>
    {fields.map((field) => (
      <Fragment key={field.name}>
        <label htmlFor={field.name}>{field.name}</label>
        <input type={field.type} id={field.name} name={field.name} />
      </Fragment>
    ))}
    <button type="submit">{submitText}</button>
  </form>
)

export default Form
