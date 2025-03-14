/**
 * QAP1 - FRONT-END & JAVASCRIPT!!
 *
 *      Name:       <Kostiantyn Karzhanov>
 *
 *      Date:       <2023-06-07>
 */

// Get the necessary elements from the DOM
const navbar = document.querySelector("#category-menu");
const title = document.querySelector("#category");
const tbody = document.querySelector("#products");

// Function to fetch data from a JSON file
const getData = async (value) => {
  // Create a request object
  const request = new Request(`./js/${value}.json`);
  // Send a fetch request and wait for the response
  const response = await fetch(request);
  // Convert the response data to JSON format
  const data = await response.json();
  return data;
};

// Function to format a number as currency
const formatToCurrency = (price, locale = "en-CA", currency = "CAD") => {
  // Define the formatting options
  const options = {
    currency,
    style: "currency",
  };
  // Create a NumberFormat object with the specified locale and options
  const formattedPriceObj = new Intl.NumberFormat(locale, options);
  // Format the price and return the formatted string
  return formattedPriceObj.format(price / 100);
};

// Function to create tabs based on a given data
const createTabs = (data, propName) => {
  // Create a DocumentFragment to hold the tabs
  const fragment = new DocumentFragment();
  // Create an unordered list element for the tabs
  const tabList = document.createElement("ul");

  // Iterate over the data and create a tab for each item
  data.forEach(({ [propName]: propValue }) => {
    // Create a list item for the tab
    const tab = document.createElement("li");
    // Create a button element for the tab
    const tabBtn = document.createElement("button");

    // Set the category value as a data attribute
    tabBtn.dataset.category = propValue;
    // Set the text content of the button
    tabBtn.textContent = propValue.slice(0, -4);
    // Set the button type
    tabBtn.type = "button";
    // Add appropriate CSS classes to the button
    tabBtn.classList.add("ff-accent", "btn-tab");

    // Append the button to the tab
    tab.appendChild(tabBtn);
    // Append the tab to the fragment
    fragment.appendChild(tab);
  });

  // Append the fragment to the tab list
  tabList.appendChild(fragment);
  // Set the first tab as active
  tabList.firstElementChild.dataset.activeTab = "";
  // Add appropriate CSS classes to the tab list
  tabList.classList.add("flex", "flex--ai-c", "flex--jc-c", "flex--gap");
  // Append the tab list to the navbar
  navbar.appendChild(tabList);
};

// Function to change the active tab
const changeActiveTab = (event) => {
  // Get the target button element
  const target = event.target.closest("button");
  if (!target) return;

  // Remove the "active" status from all active tabs
  const activeTabs = document.querySelectorAll("[data-active-tab]");
  activeTabs.forEach((item) => delete item.dataset.activeTab);
  // Set the clicked tab as active
  target.parentElement.dataset.activeTab = "";
};

// Function to create the content based on the selected tab
const createContent = (data) => {
  // Create a DocumentFragment to hold the content rows
  const fragment = new DocumentFragment();
  // Get the text content of the active tab
  title.textContent = document.querySelector(
    "[data-active-tab] button"
  ).dataset.category;

  // Sort and iterate over the data to create content rows
  [...data]
    .sort((a, b) => a.price - b.price)
    .forEach(({ id, name, description, price, discontinued, categories }) => {
      // Check if the product belongs to the selected category and is not discontinued
      if (categories.includes(title.textContent) && !discontinued) {
        // Create a table row for the product
        const rowTbody = document.createElement("tr");
        rowTbody.id = id;

        // Create table cells and set their content
        for (let i = 0; i < 3; i++) {
          const columnTbody = document.createElement("td");
          columnTbody.textContent =
            i == 0 ? name : i == 1 ? description : formatToCurrency(price);
          rowTbody.appendChild(columnTbody);
        }
        // Append the row to the fragment
        fragment.appendChild(rowTbody);
      }
    });

  // Clear the existing content and append the new content
  tbody.innerHTML = "";
  tbody.appendChild(fragment);
};

// Function to show product details in the console
const showInConsole = (event, data) => {
  // Get the clicked table row
  const target = event.target.closest("tr");
  if (!target) return;

  // Find the corresponding product data
  const filteredData = data.filter(({ id }) => id == target.id)[0];

  // Clear the console and log the product details
  console.clear();
  for (let key in filteredData) {
    console.log(`${key.toUpperCase()}: ${filteredData[key]}`);
  }
};

// Function to display the content on page load
const displayContent = async () => {
  // Fetch the categories and products data
  const dataCategories = await getData("categories");
  const dataProducts = await getData("products");

  // Create the tabs based on the categories
  createTabs(dataCategories, "description");
  // Create the initial content based on the active tab
  createContent(dataProducts);

  // Add event listener for tab clicks
  navbar.addEventListener("click", (event) => {
    changeActiveTab(event);
    createContent(dataProducts);
  });

  // Add event listener for row clicks
  tbody.addEventListener("click", (event) => {
    showInConsole(event, dataProducts);
  });
};

// Add event listener to load the content when the DOM is ready
document.addEventListener("DOMContentLoaded", displayContent);
