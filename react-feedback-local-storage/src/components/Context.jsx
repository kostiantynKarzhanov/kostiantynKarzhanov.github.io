// Import React library and its hooks for managing state and side effects
import React, { useState, useEffect } from "react";

// Create a new React context object to hold shared state and functions
const Context = React.createContext();

// Define a functional component "ContextProvider" that wraps other components and provides the context data
const ContextProvider = ({ children }) => {
  // Define constants and initial state variables used in the component
  // const API_URL = "http://localhost:5000/feedbacks";
  const maxRating = 10;
  const minFeedbackLength = 10;
  const feedbackFormMain = "feedback-form--main";
  const ratingMainContainer = "rating-container--main";
  const feedbackMainArea = "feedback-area--main";
  const feedbackFormSubmitted = "feedback-form";
  const ratingSubmittedContainer = "feedback-rating";
  const feedbackSubmittedArea = "feedback-text";
  const [feedbackArr, setFeedbackArr] = useState(() => []);
  const [isAutoFocus, setAutoFocus] = useState(() => true);
  const [isSubmitted, setIsSubmitted] = useState(() => false);

  // Define side effects using useEffect hooks to trigger actions in response to state changes
  useEffect(() => {
    // This useEffect is triggered when the "isSubmitted" state changes
    // It simply toggles the "isSubmitted" state to trigger a re-render
    isSubmitted && setIsSubmitted(false);
  }, [isSubmitted]);

  // useEffect(() => {
  //   // This useEffect is triggered once when the component is mounted
  //   // It fetches feedback data from the API using GET request and updates "feedbackArr" state
  //   getRequest(API_URL);
  // }, []);

  // // Define helper functions for handling API requests and data operations
  // const fetchData = async (url, options) => {
  //   // Function to handle common fetch logic and return the JSON response
  //   // Handles fetch errors using try-catch block
  //   try {
  //     const request = await fetch(url, options);
  //     const response = await request.json();
  //     return await response;
  //   } catch ({ name, message }) {
  //     console.log(`${name}: ${message}`);
  //   }
  // };

  // const getRequest = async (url) => {
  //   // Function to fetch data using GET request from the API and update "feedbackArr" state
  //   const data = await fetchData(url);
  //   data && setFeedbackArr(data.reverse());
  // };

  // const postRequest = async (url, body) => {
  //   // Function to send data using POST request to the API
  //   fetchData(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body),
  //   });
  // };

  // const putRequest = async (url, id, body) => {
  //   // Function to update data using PUT request to the API
  //   fetchData(`${url}/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body),
  //   });
  // };

  // const deleteRequest = async (url, id) => {
  //   // Function to delete data using DELETE request to the API
  //   fetchData(`${url}/${id}`, { method: "DELETE" });
  // };

  const getFeedbackData = (formObj, ratingContainer, feedbackContainer) => {
    // Function to extract rating and feedback data from the form elements
    // Returns an object with "rating" and "feedback" properties
    const ratingContainerArr = [...formObj[ratingContainer]];
    const checkedObj = ratingContainerArr.find(({ checked }) => checked);
    const textarea = formObj[feedbackContainer];

    const rating = checkedObj ? +checkedObj.value : 0;
    const feedback = textarea.value;
    return { rating, feedback };
  };

  const validateFeedback = (rating, feedback, minFeedbackLength) => {
    // Function to validate feedback data based on rating and minimum feedback length
    // Returns true if the feedback is valid, otherwise returns undefined
    feedback = feedback.trim();
    // add aditional messages for better UX
    if (rating && feedback.length > minFeedbackLength) return true;
  };

  const createFeedback = (newFeedback) => {
    // Function to create new feedback and update "feedbackArr" state
    setFeedbackArr((prev) => [newFeedback, ...prev]);

    // // Calls "postRequest" function to send the new feedback data to the API
    // postRequest(API_URL, newFeedback);
  };

  const resetFeedbackSection = (
    // Function to reset the form elements related to feedback input
    formObj,
    ratingContainer,
    feedbackContainer
  ) => {
    const ratingContainerArr = [...formObj[ratingContainer]];
    const checkedObj = ratingContainerArr.find(({ checked }) => checked);
    const textarea = formObj[feedbackContainer];

    if (checkedObj) checkedObj.checked = false;
    textarea.value = "";
  };

  const updateFeedback = ({ id, rating, feedback }) => {
    // Function to update existing feedback and update "feedbackArr" state
    setFeedbackArr((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rating, feedback } : item
      )
    );
    // // Calls "putRequest" function to send the updated feedback data to the API
    // putRequest(API_URL, id, { id, rating, feedback });
  };

  const deleteFeedback = (id) => {
    // Function to delete existing feedback and update "feedbackArr" state
    setFeedbackArr((prev) => prev.filter((item) => item.id !== id));

    // // Calls "deleteRequest" function to send the delete request to the API
    // deleteRequest(API_URL, id);
  };

  // Provide the shared context data and functions to the components wrapped inside this "ContextProvider"
  return (
    <Context.Provider
      value={{
        maxRating,
        minFeedbackLength,
        feedbackFormMain,
        ratingMainContainer,
        feedbackMainArea,
        feedbackFormSubmitted,
        ratingSubmittedContainer,
        feedbackSubmittedArea,
        feedbackArr,
        isAutoFocus,
        isSubmitted,
        setIsSubmitted,
        getFeedbackData,
        validateFeedback,
        createFeedback,
        resetFeedbackSection,
        updateFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Export "ContextProvider" and "Context" so that other components can use the context
export { ContextProvider };
export default Context;
