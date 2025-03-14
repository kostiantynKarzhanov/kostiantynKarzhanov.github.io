import React from "react";

const Button = ({ onClick, classValue, value }) => {
  return (
    <button onClick={onClick} className={classValue}>
      {value}
    </button>
  );
};

export default Button;
