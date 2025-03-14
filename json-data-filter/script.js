// ---------------------------------------------------------------------------------------
// Sprint-2. JSON-DATA-FILTER Project
// ---------------------------------------------------------------------------------------
// The program allows the user to filter the JSON data using checkbox filters 
// ---------------------------------------------------------------------------------------
// Author: Kostiantyn Karzhanov
// Date: April 20, 2023
// =======================================================================================

"use strict"

// --------------------------
// Assign required constants
// --------------------------

// The file path to the JSON data file
const file = "./data.json";

// Get elements from the HTML file
const filters = document.querySelector("#filters");
const filterGenders = filters.querySelector("#genders");
const filterAges = filters.querySelector("#ages");
const filterStatuses = filters.querySelector("#statuses");
const filterInterests = filters.querySelector("#interests");
const btnShowFilteredData = document.querySelector("#show-filtered");
const sectionResults = document.querySelector("#results");

// Create an ordered list element to display filtered data
const listResults = document.createElement("ol");
listResults.setAttribute("id", "list-results");
listResults.className = "list-results";

// Create a prefix element
const agePrefix = document.createElement("span");
agePrefix.innerHTML = "up to";

// Create an element to display the current filter for an age
const ageResults = document.createElement("span");
ageResults.className = "age-result";

// Create an element as a container for age results
const ageBox = document.createElement("div");
ageBox.className = "flex flex--ai-c flex--jc-fs flex--gap";
ageBox.appendChild(agePrefix);
ageBox.appendChild(ageResults);

// Initialize variables for filter ranges and checkbox selections
// The selected age range
let rangeAge;

// The variable "chkboxAllAcc" contains an array with selected data
// let chkboxAllAcc;

// An array to track which gender checkboxes are selected
const chkboxGendersAcc = [];
// An array to track which status checkboxes are selected
const chkboxStatusesAcc = [];
// An array to track which interest checkboxes are selected
const chkboxInterestsAcc = [];
// An object accumulator to store unique data from JSON file
const uniqDataAllAcc = {};
// An error message when no results match the filter criteria
const msgMatchError = "No one matches the criteria you have provided. Please try again with different criteria";

// ----------------------------
// Reqired functions goes here
// ----------------------------

function getAge(birthday, dateReference = Date.now()){
// The function calculates the age based on a provided birthday and reference date (with todays date as default value)
    // Subtract the birthday year from the reference date year to get the result 
    return (new Date(dateReference)).getFullYear() - (new Date(birthday)).getFullYear();
}


function convertKilosToPounds(kilos){
// The function converts a kilo weight to pounds weight
    // Convert given value to a float
    kilos = parseFloat(kilos);

    // If the value cannot be converted to a number, return an empty string
    if(isNaN(kilos)) return "";

    // Define the conversion factor from kilos to pounds
    const conversionFactor = 2.2046226218;
    // Calculate the weight in pounds, rounded to two decimal places
    let pounds = (kilos * conversionFactor).toFixed(2);

    // Concatenate the weight in pounds with the "lbs" unit of measurement
    return pounds.concat(" lbs");
}


function convertCentimetersToFeet(centimeters){
// The function converts a length in centimeters to a length in feet and inches
    // Convert given value to a float
    centimeters = parseFloat(centimeters);

    // If the value cannot be converted to a number, return an empty string
    if(isNaN(centimeters)) return "";

    // Define conversion factors from centimeters to feet and inches
    const conversionFactorFoot = 0.0328084;
    const conversionFactorInch = 12;

    // Calculate the length in feet and inches
    let lengthFeet = centimeters * conversionFactorFoot;
    let footPart = parseInt(centimeters * conversionFactorFoot);
    let inchPart = Math.round((lengthFeet % footPart) * conversionFactorInch);

    // Return the length in feet and inches as a formatted string
    return `${footPart}' ${inchPart}''`;
}


function addToChkboxAcc(id, value){
// The function adds a value to the corresponding checkbox accumulator array based on the ID provided
    if(id == "genders"){
        // If the ID is "genders", add the value to the chkboxGendersAcc array
        chkboxGendersAcc.push(value);
    } else if(id == "statuses"){
        // If the ID is "statuses", add the value to the chkboxStatusesAcc array
        chkboxStatusesAcc.push(value);
    } else if(id == "interests"){
        // If the ID is "interests", add the value to the chkboxInterestsAcc array
        chkboxInterestsAcc.push(value);
    }
}


function removeFromChkboxAcc(id, value){
// The function removes a value from the corresponding checkbox accumulator array based on the ID provided
    let index;

    if(id == "genders"){
        // If the ID is "genders", find the index of the value in the chkboxGendersAcc array and remove it
        index = chkboxGendersAcc.indexOf(value);
        index != -1 && chkboxGendersAcc.splice(index, 1);
    } else if(id == "statuses"){
        // If the ID is "statuses", find the index of the value in the chkboxStatusesAcc array and remove it
        index = chkboxStatusesAcc.indexOf(value);
        index != -1 && chkboxStatusesAcc.splice(index, 1);
    } else if(id == "interests"){
        // If the ID is "interests", find the index of the value in the chkboxInterestsAcc array and remove it
        index = chkboxInterestsAcc.indexOf(value);
        index != -1 && chkboxInterestsAcc.splice(index, 1);
    }
}


function addSelectedData(event){
// The function is called when a user selects a checkbox or changes the "Ages" range
    // Find the closest "input" element that was clicked on
    let targetElement = event.target.closest("input");

    // If no "input" element was found, return without doing anything
    if(!targetElement) return;
    
    // Get the parent "label" and "form" elements of the clicked "input" element
    let parentLabel = targetElement.parentNode;
    let parentForm = parentLabel.parentNode;

    // If the "Ages" range was clicked, update the "rangeAge" variable with the new value
    if(targetElement.id == "ages-ctrl"){
        rangeAge = targetElement.value;
        ageResults.innerHTML = rangeAge;
    }

    if(targetElement.checked == true){
        // If the checkbox was checked, add the value to the corresponding array in the checkbox accumulator
        addToChkboxAcc(parentForm.id, targetElement.value)
    } else if(targetElement.checked == false){
        // If the checkbox was unchecked, remove the value from the corresponding array in the checkbox accumulator
        removeFromChkboxAcc(parentForm.id, targetElement.value)
    }

    // Uncomment the following lines to log all selected values to the console for debugging purposes
    // chkboxAllAcc = [...chkboxGendersAcc, ...chkboxStatusesAcc, ...chkboxInterestsAcc, rangeAge];
    // console.log(chkboxAllAcc);
}


function showSelectedData(){
// The function shows the selected data based on checked filters (checkboxes)
    // If the section "Results" is empty or doesn't contain the "listResults" list tag add tag to the section
    if(sectionResults.children.length == 0 || sectionResults.lastElementChild.tagName != listResults.tagName){
        sectionResults.appendChild(listResults);
    }

    // Clear the console and the "listResults" list for new data
    console.clear();
    listResults.innerHTML = "";

    // Fetch a JSON file and process the data
    fetch(file)
    // When the data is returned, convert it to JSON format
    .then(response => response.json())
    // Process JSON data
    .then(data => {
        const arrResults = [];

        // Loop through each data entry and extract the necessary information using "Destructuring assignment" syntax
        data.forEach(({ name, gender, "physical attributes":{weight, height, "hair color": hair, "eye color": eyes}, birthday, address:{city}, status, interests, phone, email }) => {
            
            // Filter results based on user-selected gender
            if(chkboxGendersAcc.length > 0 && chkboxGendersAcc.indexOf(gender) == -1) return;

            // Filter results based on user-selected age range
            if(getAge(birthday) > rangeAge) return;

            // Filter results based on user-selected relationship status
            if(chkboxStatusesAcc.length > 0 && chkboxStatusesAcc.indexOf(status) == -1) return;

            // Filter results based on user-selected interests
            for(let i = 0; i < chkboxInterestsAcc.length; i++){
                if(interests.indexOf(chkboxInterestsAcc[i]) == -1) return;
            }

            // If any filters are applied, add the data to the "arrResults" array
            if(chkboxGendersAcc.length > 0 || getAge(birthday) <= rangeAge || chkboxStatusesAcc.length > 0 || chkboxInterestsAcc.length > 0){
                arrResults.push([name.title, name.first, name.last, birthday, weight, height, hair, eyes, city, phone, email]);
            }
        });

        // If there is no corresponding data, display an error message
        if(arrResults.length == 0){
            console.log(msgMatchError);
            listResults.innerHTML = msgMatchError;
        } else {
            // Loop through each "arrResults" item and display the information in a formatted manner
            arrResults.forEach((item, index) => {
                // Make dates more readable for the user
                const objBirthday = new Date(item[3]);
                const objBirthdayYear = objBirthday.getFullYear();
                const objBirthdayMonth = objBirthday.toLocaleString("default", { month: "long" });
                const objBirthdayDate = objBirthday.getDate();
                const birthdayDsp = `${objBirthdayDate} ${objBirthdayMonth} ${objBirthdayYear}`;

                const fullNameDsp = `${item[0]}. ${item[1]} ${item[2]}`

                // Convert weight from kilograms to pounds and create weight display string
                const weightDsp = convertKilosToPounds(item[4]);
                // Convert height from centimeters to feet and inches and create height display string
                const heightDsp = convertCentimetersToFeet(item[5]);

                // Create the complete output string for the current result
                const strItem = `${fullNameDsp}, ${birthdayDsp}, weight: ${weightDsp} (${item[4]}), height: ${heightDsp} (${item[5]}), ${item[6]} hair, ${item[7]} eyes (${item[8]}, ${item[9]}, ${item[10]});`

                // Create line separator string for better output in the console
                const lineDsp = "-".repeat(10);
                // Show the output in the console
                console.log(`${lineDsp}\n${strItem}\n${lineDsp}`);

                // Add each result to the "listResults" list as an HTML list item
                listResults.innerHTML += `<li class="list-item">${strItem}</li>`;
            });
        }
    })
}

// ------------------------------------------
// Generate HTML elements based on JSON data
// ------------------------------------------

// Fetch a JSON file and process the data
fetch(file)
// When the data is returned, convert it to JSON format
.then(response => response.json())
// Process JSON data
.then(data => {
    // Loop through each data entry and extract the necessary information using "Destructuring assignment" syntax
    data.forEach(({ gender, birthday, status, interests }) => {
        // Check if object accumulator contains arrays with unique data
        if(!uniqDataAllAcc.genders && !uniqDataAllAcc.ages && !uniqDataAllAcc.statuses && !uniqDataAllAcc.interests){
            // If not, initialize arrays to store unique data
            uniqDataAllAcc.genders = [];
            uniqDataAllAcc.ages = [];
            uniqDataAllAcc.statuses = [];
            uniqDataAllAcc.interests = [];
        } else if(uniqDataAllAcc.genders && uniqDataAllAcc.ages && uniqDataAllAcc.statuses && uniqDataAllAcc.interests){
            // If the gender is not yet in the array, add it
            uniqDataAllAcc.genders.indexOf(gender) == -1 && uniqDataAllAcc.genders.push(gender);
            
            // Calculate the age from the birthday string and add it to the ages array if it's not already in it
            const age = getAge(birthday);
            uniqDataAllAcc.ages.indexOf(age) == -1 && uniqDataAllAcc.ages.push(age);

            // If the status is not yet in the array, add it
            uniqDataAllAcc.statuses.indexOf(status) == -1 && uniqDataAllAcc.statuses.push(status);

            // Iterate through the interests array and add each interest to the interests array if it's not already in it
            interests.forEach(item => {
                uniqDataAllAcc.interests.indexOf(item) == -1 && uniqDataAllAcc.interests.push(item);
            })
        }
    });

    // Create copy of the "Genders" array using spread operator and sort it alphabetically
    let uniqDataGendersSorted = [...uniqDataAllAcc.genders].sort();
    // Create copy of the "Ages" array using spread operator and sort it numerically using Compare Function
    let uniqDataAgesSorted = [...uniqDataAllAcc.ages].sort((a, b) => a - b);
    // Assign range value to the highest age
    rangeAge = uniqDataAgesSorted[(uniqDataAgesSorted.length - 1)];
    ageResults.innerHTML = rangeAge;

    // Create copy of the "Statuses" array using spread operator and sort it alphabetically
    let uniqDataStatusesSorted = [...uniqDataAllAcc.statuses].sort();
    // Create copy of the "Interests" array using spread operator and sort it alphabetically
    let uniqDataInterestsSorted = [...uniqDataAllAcc.interests].sort();

    // Create a checkbox input for each array item
    uniqDataGendersSorted.forEach((item, index) => {
        filterGenders.innerHTML += `<label for="gender-${index + 1}"><input id="gender-${index + 1}" type="checkbox" name="gender-${index + 1}" value="${item}">${item[0].toUpperCase().concat(item.slice(1))}</label>`;
    });
    // Create a range input with a default value of the highest age
    filterAges.innerHTML += `<label for="ages-ctrl"><input id="ages-ctrl" type="range" name="ages-ctrl" min="${uniqDataAgesSorted[0]}" max="${uniqDataAgesSorted[(uniqDataAgesSorted.length - 1)]}" step="1" value="${uniqDataAgesSorted[(uniqDataAgesSorted.length - 1)]}"></label>`;
    // Append an element showing the current filter for an age
    filterAges.appendChild(ageBox);
    // Create a checkbox input for each array item
    uniqDataStatusesSorted.forEach((item, index) => {
        filterStatuses.innerHTML += `<label for="status-${index + 1}"><input id="status-${index + 1}" type="checkbox" name="status-${index + 1}" value="${item}">${item[0].toUpperCase().concat(item.slice(1))}</label>`;
    });

    // Create a checkbox input for each array item
    uniqDataInterestsSorted.forEach((item, index) => {
        filterInterests.innerHTML += `<label for="interest-${index + 1}"><input id="interest-${index + 1}" type="checkbox" name="interest-${index + 1}" value="${item}">${item[0].toUpperCase().concat(item.slice(1))}</label>`;
    });
});


// Add a click Event Listener to the "filters" element ("Event Delegation") to detect when child checkboxes or the "Ages" range is clicked
filters.addEventListener("click", addSelectedData);
// Add a click Event Listener to the "btnShowFilteredData" element to detect when the "Show filtered data" button is clicked
btnShowFilteredData.addEventListener("click", showSelectedData);
