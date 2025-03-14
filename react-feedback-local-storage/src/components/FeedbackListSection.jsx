// Import React and necessary components and Context
import React, { useContext } from "react";
import Context from "./Context";
import FeedbackListItem from "./FeedbackListItem";

// Define the functional component "FeedbackListSection" that represents the section containing the feedback list item
const FeedbackListSection = () => {
  // Extract the "feedbackArr" array from the Context using useContext
  const { feedbackArr } = useContext(Context);

  // Render the "FeedbackListSection" component with the feedback items
  return (
    <section>
      <ul className="flow-spacing--m">
        {feedbackArr.map(({ id, rating, feedback }, index) => (
          <FeedbackListItem
            key={`${id}${index}`}
            idHandle={id}
            ratingHandle={rating}
            feedbackHandle={feedback}
          />
        ))}
      </ul>
    </section>
  );
};

// Export the FeedbackListSection component
export default FeedbackListSection;
