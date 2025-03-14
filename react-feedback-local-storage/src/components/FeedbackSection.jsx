// Import React and necessary components
import React, { useState, useEffect, useContext } from "react";
import Context from "./Context";
import RatingContainer from "./RatingContainer";
import FeedbackContainer from "./FeedbackContainer";
import Button from "./Button";

// Define the functional component "FeedbackSection" that represents the feedback section with a form to add new feedback
const FeedbackSection = () => {
  // Extract necessary data and functions from the Context using useContext
  const {
    maxRating,
    minFeedbackLength,
    feedbackFormMain,
    ratingMainContainer,
    feedbackMainArea,
    feedbackArr,
    isAutoFocus,
    isSubmitted,
    setIsSubmitted,
    getFeedbackData,
    validateFeedback,
    createFeedback,
    resetFeedbackSection,
  } = useContext(Context);

  // Initialize state variables
  const [isBtnDisabled, setIsBtnDisabled] = useState(() => true);
  const [ratingBool, setRatingBool] = useState(() => false);
  const [feedbackBool, setFeedbackBool] = useState(() => false);

  // useEffect to enable or disable the "Add Feedback" button based on ratingBool and feedbackBool
  useEffect(() => {
    if (ratingBool && feedbackBool) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [ratingBool, feedbackBool]);

  // useEffect to reset ratingBool and feedbackBool when isSubmitted changes
  useEffect(() => {
    setRatingBool(false);
    setFeedbackBool(false);
  }, [isSubmitted]);

  // Function to process the form submission and add new feedback
  const processSubmit = (target) => {
    const { rating, feedback } = getFeedbackData(
      target,
      ratingMainContainer,
      feedbackMainArea
    );
    const id = feedbackArr.length + 1;

    const flag = validateFeedback(rating, feedback, minFeedbackLength);
    if (flag) {
      console.log("passed validation, ready to submit");
      createFeedback({ id, rating, feedback });
      resetFeedbackSection(target, ratingMainContainer, feedbackMainArea);
      setIsSubmitted(true);
    } else {
      console.log("didn't pass validation");
    }
  };

  // Function to handle the form submission event
  const handleOnSubmit = (event) => {
    event.preventDefault();
    processSubmit(event.target);
  };

  // Render the "FeedbackSection" component with the feedback form
  return (
    <section>
      <form
        id={feedbackFormMain}
        onSubmit={(event) => handleOnSubmit(event)}
        className="flow-spacing--xs"
      >
        <RatingContainer
          classHandle="rating-container"
          maxRatingHandle={maxRating}
          setRatingBoolHandle={setRatingBool}
          itemIDHandle={`${ratingMainContainer}_`}
          itemNameHandle={ratingMainContainer}
        />
        <FeedbackContainer
          setFeedbackBoolHandle={setFeedbackBool}
          itemIDHandle={feedbackMainArea}
          itemNameHandle={feedbackMainArea}
          autoFocusHandle={isAutoFocus}
        />
        <Button
          idHandle="btn--submit"
          typeHandle="submit"
          disabledHandle={isBtnDisabled}
          children="Add Feedback"
        />
      </form>
    </section>
  );
};

// Export the FeedbackSection component
export default FeedbackSection;
