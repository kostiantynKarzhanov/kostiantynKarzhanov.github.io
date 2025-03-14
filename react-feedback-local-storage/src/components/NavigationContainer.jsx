// Import React and NavLink from "react-router-dom"
import React from "react";
import { NavLink } from "react-router-dom";

// Import the CSS styles for the navigation component
import "./css/nav.css";

// Define the functional component "NavigationContainer" for displaying the navigation menu
const NavigationContainer = () => {
  // Define an array containing the navigation items
  const navigationArr = ["home", "feedback", "about", "contact"];

  // Render the "NavigationContainer" component with the navigation menu
  return (
    <header className="container--py">
      <nav>
        {/* Create a navigation menu using an unordered list */}
        <ul className="flex flex--gap text-capital fw--400">
          {navigationArr.map((item, index) => (
            <li key={index}>
              <NavLink to={item}>{item}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

// Export the NavigationContainer component
export default NavigationContainer;
