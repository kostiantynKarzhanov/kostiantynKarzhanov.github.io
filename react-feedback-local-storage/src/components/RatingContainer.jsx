// Import React library and its hooks for managing state and side effects
import React, { useContext, useState, useEffect } from "react";
import Context from "./Context";
import RatingItem from "./RatingItem";

// Import the CSS styles for the rating container component
import "./css/rating.css";

// Define the functional component "RatingContainer" for displaying the rating container
const RatingContainer = ({
  classHandle,
  ratingHandle,
  maxRatingHandle,
  setRatingBoolHandle,
  itemIDHandle,
  itemNameHandle,
  disabledHandle,
}) => {
  // Use the "useContext" hook to access the shared context data
  const { isSubmitted } = useContext(Context);
  const [rating, setRating] = useState(() => ratingHandle);

  // Update the rating state when the "isSubmitted" state changes
  useEffect(() => {
    isSubmitted && setRating(ratingHandle);
  }, [isSubmitted]);

  // Update the "ratingBool" state in the parent component based on the current rating
  useEffect(() => {
    setRatingBoolHandle(!!rating);
  }, [rating]);

  // // first variant (checked)
  // const handleOnChange = (event) => {
  //   setRating(+event.target.value);
  // };
  // const handleDoubleClick = () => {
  //   setRating(0);
  // };

  // second variant (defaultChecked)
  // Handle click event when a rating item is clicked
  const handleClick = (event) => {
    const target = event.target.closest("input");
    if (!target) return;

    const targetValue = +target.value;

    setRating(targetValue);
  };

  // Handle double-click event to clear the rating
  const handleDoubleClick = (event) => {
    const target = event.currentTarget;
    const checkedObj = [...target.children].find(
      ({ children: [{ checked }] }) => checked
    );

    if (!checkedObj) return;
    checkedObj.children[0].checked = false;

    setRating(0);
  };

  // Render the "RatingContainer" component with the rating items
  return (
    <>
      <div
        // // first variant (checked)
        // onDoubleClick={handleDoubleClick}

        // second variant (defaultChecked)
        onClick={(event) => handleClick(event)}
        onDoubleClick={(event) => !disabledHandle && handleDoubleClick(event)}
        className={classHandle}
      >
        {Array.from({ length: maxRatingHandle }, (_, index) => (
          <RatingItem
            key={index}
            // handleOnChange={handleOnChange}
            dataAttrHandle={index + 1 <= rating}
            itemIDHandle={`${itemIDHandle}${index + 1}`}
            itemNameHandle={itemNameHandle}
            valueHandle={index + 1}
            checkedHandle={index + 1 === rating}
            disabledHandle={disabledHandle}
          />
        ))}
      </div>
    </>
  );
};

// Set default props for "RatingContainer" component
RatingContainer.defaultProps = {
  ratingHandle: 0,
  disabledHandle: false,
};

// Export the RatingContainer component
export default RatingContainer;

// difference between first and second variants:
//    1. After first click (checked):
//        - checked: true
//        - defaultChecked: false
//        - attr checked: false
//
//    2. After first click (defaultChecked):
//        - checked: true
//        - defaultChecked: true
//        - attr checked: true
//
//    1. After Changes (checked):
//        default item:
//          - checked: false - true
//          - defaultChecked: false - false
//          - attr checked: false - false
//
//        changed item:
//          - checked: true
//          - defaultChecked: false
//          - attr checked: false
//
//    2. After Changes (defaultChecked):
//        default item:
//          - checked: false - true
//          - defaultChecked: false - true
//          - attr checked: false - true
//
//        changed item:
//          - checked: true
//          - defaultChecked: true
//          - attr checked: true
//
//    1. After Submit (checked):
//        - checked: true
//        - defaultChecked: true
//        - attr checked: true
//
//    2. After Submit (defaultChecked):
//        - checked: true
//        - defaultChecked: true
//        - attr checked: true
//
//    1. After Changes Submit (checked):
//        default item:
//          - checked: true -> false
//          - defaultChecked: true -> true
//          - attr checked: true -> true
//
//        changed item:
//          - checked: true
//          - defaultChecked: false
//          - attr checked: false
//
//    2. After Changes Submit (defaultChecked):
//        default item:
//          - checked: true -> false
//          - defaultChecked: true -> false
//          - attr checked: true -> false
//
//        changed item:
//          - checked: true
//          - defaultChecked: true
//          - attr checked: true
//
