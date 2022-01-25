import React, { Fragment } from 'react';


const Form = ({ handleSubmit, fields, submitText }) => {
  console.log(fields)
  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <Fragment key={field}>
          <label htmlFor={field}>{field}</label>
          <input type={field} id={field} name={field} />
        </Fragment>
      ))}
      <button type="submit">{submitText}</button>
    </form>
  )
};

export default Form;
