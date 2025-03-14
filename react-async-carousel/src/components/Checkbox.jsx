import React from "react";

const Checkbox = ({ classValue, checkboxValue }) => {
  return <input type="checkbox" className={classValue} value={checkboxValue} />;
};

export default Checkbox;
