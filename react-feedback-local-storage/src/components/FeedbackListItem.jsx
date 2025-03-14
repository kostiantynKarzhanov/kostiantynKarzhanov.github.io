// Import React and necessary components
import React, { useState, useEffect, useContext } from "react";
import Context from "./Context";
import RatingContainer from "./RatingContainer";
import FeedbackContainer from "./FeedbackContainer";
import Button from "./Button";
import "./css/button.css";

// Define the functional component "FeedbackListItem" that represents a single feedback item
const FeedbackListItem = ({ idHandle, ratingHandle, feedbackHandle }) => {
  // Extract necessary data and functions from the Context using useContext
  const {
    maxRating,
    minFeedbackLength,
    feedbackFormSubmitted,
    ratingSubmittedContainer,
    feedbackSubmittedArea,
    getFeedbackData,
    validateFeedback,
    updateFeedback,
    deleteFeedback,
  } = useContext(Context);

  // State variables to manage the component behavior
  const [isDisabled, setIsDisabled] = useState(() => true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(() => false);
  const [ratingBool, setRatingBool] = useState(() => true);
  const [feedbackBool, setFeedbackBool] = useState(() => true);
  const [btnChildren, setBtnChildren] = useState(() => "Edit");

  // useEffect to update the button's disabled state based on ratingBool and feedbackBool
  useEffect(() => {
    if (ratingBool && feedbackBool) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [ratingBool, feedbackBool]);

  // Function to process clicks on the "Edit" and "Save" buttons
  const processClickBtnEditSave = (target, formElement, id) => {
    const { rating, feedback } = getFeedbackData(
      formElement,
      `${ratingSubmittedContainer}-${id}`,
      `${feedbackSubmittedArea}-${id}`
    );

    if (target.textContent === "Edit") {
      setIsDisabled(false);
      setBtnChildren("Save");
    } else if (target.textContent === "Save") {
      const flag = validateFeedback(rating, feedback, minFeedbackLength);

      if (flag) {
        updateFeedback({ id, rating, feedback });
        setIsDisabled(true);
        setBtnChildren("Edit");
      }
    }
  };

  // Function to process clicks on the "Delete" button
  const processClickBtnDelete = (id) => {
    deleteFeedback(id);
  };

  // Function to handle button clicks (Edit, Save, Delete)
  const handleClick = (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    const targetContainer = target.parentElement;
    const formElement = targetContainer.previousElementSibling;
    const id = +formElement.id.split("-").slice(-1)[0];

    if (target.id === "btn--edit") {
      processClickBtnEditSave(target, formElement, id);
    } else if (target.id === "btn--delete") {
      processClickBtnDelete(id);
    }
  };

  // Render the FeedbackListItem component with RatingContainer, FeedbackContainer, and Buttons
  return (
    <li className="p--rel" {...(isDisabled && { "data-disabled": "" })}>
      <form
        id={`${feedbackFormSubmitted}-${idHandle}`}
        className="flow-spacing--xs"
      >
        <RatingContainer
          classHandle="rating-container size--xs"
          ratingHandle={ratingHandle}
          maxRatingHandle={maxRating}
          setRatingBoolHandle={setRatingBool}
          itemIDHandle={`${ratingSubmittedContainer}-${idHandle}_`}
          itemNameHandle={`${ratingSubmittedContainer}-${idHandle}`}
          disabledHandle={isDisabled}
        />
        <FeedbackContainer
          setFeedbackBoolHandle={setFeedbackBool}
          itemIDHandle={`${feedbackSubmittedArea}-${idHandle}`}
          itemNameHandle={`${feedbackSubmittedArea}-${idHandle}`}
          feedbackHandle={feedbackHandle}
          disabledHandle={isDisabled}
        />
      </form>
      <div
        onClick={(event) => handleClick(event)}
        className="btn-container grid grid-container grid--all-gap p--abs"
      >
        <Button
          idHandle="btn--edit"
          classHandle={btnChildren === "Save" && "btn--active"}
          disabledHandle={isBtnDisabled}
          children={btnChildren}
        />
        <Button idHandle="btn--delete" children="Delete" />
      </div>
    </li>
  );
};

// Export the FeedbackListItem component
export default FeedbackListItem;
