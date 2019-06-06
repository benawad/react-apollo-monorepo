import React from "react";

export const Input = ({ field, form }) => {
  const touched = form.touched[field.name];
  const error = form.errors[field.name];
  return (
    <div>
      <input {...field} />
      <div style={{ color: "red" }}>{touched && error}</div>
    </div>
  );
};
