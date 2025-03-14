// Import React library and hooks
import React, { useContext } from "react";

// Import the Context component to access shared context data and functions
import Context from "./Context";

// Import the FeedbackItem component to render the feedback input item
import FeedbackItem from "./FeedbackItem";

// Define the functional component "FeedbackContainer" that displays the feedback input container
const FeedbackContainer = ({
  setFeedbackBoolHandle,
  itemIDHandle,
  itemNameHandle,
  feedbackHandle,
  autoFocusHandle,
  disabledHandle,
}) => {
  // Use the "useContext" hook to access the shared context data
  const { minFeedbackLength } = useContext(Context);

  // Define a function "resizeArea" to resize the text area based on its content
  const resizeArea = (target) => {
    // Auto adjust the height of the text area to fit its content
    target.style.height = "auto";

    // Check if the client height is different from the scroll height
    if (target.clientHeight !== target.scrollHeight) {
      target.style.height = target.scrollHeight + "px";
    }
  };

  // Define a function "handleOnChange" to handle changes in the feedback input
  const handleOnChange = (event) => {
    const target = event.currentTarget;

    // Set "feedbackBoolHandle" based on whether the trimmed feedback length is greater than the minimum length
    setFeedbackBoolHandle(target.value.trim().length > minFeedbackLength);

    // Resize the text area to fit its content
    resizeArea(target);
  };

  // Render the FeedbackItem component and pass necessary props to it
  return (
    <div>
      <FeedbackItem
        handleOnChange={handleOnChange}
        itemIDHandle={itemIDHandle}
        itemNameHandle={itemNameHandle}
        feedbackHandle={feedbackHandle}
        autoFocusHandle={autoFocusHandle}
        disabledHandle={disabledHandle}
      />
    </div>
  );
};

// Set default props for the FeedbackContainer component
FeedbackContainer.defaultProps = {
  feedbackHandle: "",
  disabledHandle: false,
  autoFocusHandle: false,
};

// Export the FeedbackContainer component
export default FeedbackContainer;
