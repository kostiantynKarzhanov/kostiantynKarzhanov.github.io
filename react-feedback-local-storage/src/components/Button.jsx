// Import React library to use React components and hooks
import React from "react";

// Define the functional component "Button" which takes props as input
const Button = ({
  idHandle,
  classHandle,
  typeHandle,
  disabledHandle,
  children,
}) => {
  // Return the JSX (React's syntax for rendering components) for the button
  return (
    <button
      id={idHandle}
      className={"d-block b-radius" + (classHandle ? ` ${classHandle}` : "")}
      type={typeHandle}
      disabled={disabledHandle}
    >
      {children}
    </button>
  );
};

// Define default prop values for the component in case they are not provided
Button.defaultProps = {
  typeHandle: "button",
  disabledHandle: false,
};

// Export the "Button" component so that it can be imported and used in other files
export default Button;
