import React from "react";

const Input = ({
  value,
  setter,
  type = "text",
  id = null,
  placeHolder = null,
}) => {
  const handleChange = (e) => {
    setter(e.target.value);
  };
  return (
    <input
      placeholder={placeHolder}
      type={type}
      id={id}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
