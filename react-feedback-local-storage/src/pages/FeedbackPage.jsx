// Import React and necessary components
import React from "react";
import { ContextProvider } from "../components/Context";
import FeedbackSection from "../components/FeedbackSection";
import FeedbackStatisticSection from "../components/FeedbackStatisticSection";
import FeedbackListSection from "../components/FeedbackListSection";

// Define the functional component "FeedbackPage" that displays feedback App on the page
const FeedbackPage = () => {
  return (
    <>
      <main>
        <div className="flow-spacing--s">
          <ContextProvider>
            <h1 className="fw--600">Rate us</h1>
            <FeedbackSection />
            <FeedbackStatisticSection />
            <FeedbackListSection />
          </ContextProvider>
        </div>
      </main>
    </>
  );
};

// Export the FeedbackPage component
export default FeedbackPage;
