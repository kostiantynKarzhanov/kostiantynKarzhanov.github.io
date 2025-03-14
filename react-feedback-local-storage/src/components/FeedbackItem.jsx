// Import React library and the CSS styles for the component
import React from "react";
import "./css/feedback.css";

// Define the functional component "FeedbackItem" that renders the feedback textarea
const FeedbackItem = ({
  handleOnChange,
  itemIDHandle,
  itemNameHandle,
  feedbackHandle,
  autoFocusHandle,
  disabledHandle,
}) => {
  // Render a textarea element to capture user feedback
  return (
    <textarea
      onChange={handleOnChange}
      id={itemIDHandle}
      className="feedback b-radius"
      name={itemNameHandle}
      defaultValue={feedbackHandle}
      placeholder="Add your feedback here"
      autoFocus={autoFocusHandle}
      disabled={disabledHandle}
    ></textarea>
  );
};

// Export the FeedbackItem component
export default FeedbackItem;
