// Import React and FaStar icon from React-Icons library
import React from "react";
import { FaStar } from "react-icons/fa";

// Define the functional component "RatingItem" for displaying a single rating item
const RatingItem = ({
  // handleOnChange,
  dataAttrHandle,
  itemIDHandle,
  itemNameHandle,
  valueHandle,
  checkedHandle,
  disabledHandle,
}) => {
  // Render the rating item as a label element containing an input (radio button) and the FaStar icon
  return (
    <label
      className="p--rel"
      htmlFor={itemIDHandle}
      {...(dataAttrHandle && { "data-selected": "" })}
    >
      <input
        // onChange={handleOnChange}
        id={itemIDHandle}
        className="sr-only"
        name={itemNameHandle}
        value={valueHandle}
        type="radio"
        // checked={checkedHandle}
        defaultChecked={checkedHandle}
        disabled={disabledHandle}
      />
      <FaStar />
    </label>
  );
};

// Export the RatingItem component
export default RatingItem;
