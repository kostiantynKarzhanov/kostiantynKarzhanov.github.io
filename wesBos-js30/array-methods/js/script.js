const inventors = [
	{ first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
	{ first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
	{ first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
	{ first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
	{ first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
	{ first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
	{ first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
	{ first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
	{ first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
	{ first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
	{ first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
	{ first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];


// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's

/* ------------------------------------------------------------------------------------ */

// const fifteen = inventors.reduce((total, value) => {
// 	if(value.year >= 1500 && value.year < 1600){
// 		total.push(value);
// 	}
// 	return total;
// }, [])

// console.table(fifteen);

/* ------------------------------------------------------------------------------------ */

// const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));
// console.table(fifteen);

/* ------------------------------------------------------------------------------------ */

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names

/* ------------------------------------------------------------------------------------ */

// const fullNames = inventors.map((inventor) => {
// 	return `${inventor.first} ${inventor.last}`;
// })

// console.table(fullNames);

/* ------------------------------------------------------------------------------------ */

// const fullNames = inventors.reduce((total, value) => {
// 	return total.concat(`${value.first} ${value.last}`);
// }, [])

// console.log(fullNames);

/* ------------------------------------------------------------------------------------ */


// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest

/* ------------------------------------------------------------------------------------ */

// const sorted = [...inventors].sort(compareFn);

// function compareFn(a, b){
// 	a = a.year;
// 	b = b.year;

// 	if(a > b){
// 		return 1;
// 	} else if(a < b){
// 		return -1;
// 	} else {
// 		return 0;
// 	}
// }

// console.table(sorted);
// console.log(inventors);

/* ------------------------------------------------------------------------------------ */

// const sorted = [...inventors].sort(compareFn);

// function compareFn(a, b){
// 	a = a.passed - a.year;
// 	b = b.passed - b.year;

// 	if(a > b){
// 		return 1;
// 	} else if(a < b){
// 		return -1;
// 	} else {
// 		return 0;
// 	}
// }
// console.table(sorted);

/* ------------------------------------------------------------------------------------ */

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?

/* ------------------------------------------------------------------------------------ */

// const initialValue = 0;
// function reducer(total, value){
// 	return total += value.passed - value.year;
// }

// const totalNumberOfYears = inventors.reduce(reducer, initialValue);
// console.log(totalNumberOfYears);

/* ------------------------------------------------------------------------------------ */

// const totalNumberOfYears = inventors.reduce((total, value) => {
// 	return total += value.passed - value.year;
// }, 0);

// console.log(totalNumberOfYears);

/* ------------------------------------------------------------------------------------ */

// const inventorsPlus = inventors.reduce((total, value) => {
// 	value.lifetime = value.passed - value.year;
// 	total.push(value);
// 	return total;
// }, []);

// console.log(inventorsPlus);
// console.log(inventorsPlus.reduce((total, value) => {
// 	return total += value.lifetime;
// }, 0));


/* ------------------------------------------------------------------------------------ */

// 5. Sort the inventors by years lived

/* ------------------------------------------------------------------------------------ */

// const inventorsPlus = inventors.reduce((total, value) => {
// 	value.lifetime = value.passed - value.year;
// 	total.push(value);
// 	return total;
// }, []);

// function compareFn(a, b){
// 	a = a.passed - a.year;
// 	b = b.passed - b.year;

// 	return a > b ? 1 : -1; 
// }

// const sorted = [...inventorsPlus].sort(compareFn);
// console.table(sorted);

/* ------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------ */

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

/* ------------------------------------------------------------------------------------ */
/* was running in console on wikipedia */
// const linksContainer = document.querySelectorAll(".mw-category-group a");
// const boulevardArray = [...linksContainer];
// // const boulevardArray = Array.from(linksContainer);

// const de = boulevardArray.reduce((total, value) => {
	
// 	if(value.textContent.includes("de")){
// 		total.push(value.textContent);
// 	} 
// 	return total;
// }, []);

// de;

/* ------------------------------------------------------------------------------------ */

// const linksContainer = document.querySelectorAll(".mw-category-group a");
// const boulevardArray = [];

// linksContainer.forEach((link) => {
// 	boulevardArray.push(link.textContent);
// })

// const de = boulevardArray.reduce((total, value) => {
// 	if(value.indexOf("de") !== -1){
// 		total.push(value);
// 	} 
// 	return total;
// }, []);

// de;

/* ------------------------------------------------------------------------------------ */

// const longString = "Boulevards of Paris,City walls of Paris,Thiers wall,Wall of Charles V,Wall of Philip II Augustus,City gates of Paris,Haussmann's renovation of Paris,Boulevards of the Marshals,Boulevard Auguste-Blanqui,Boulevard Barbès,Boulevard Beaumarchais,Boulevard de l'Amiral-Bruix,Boulevard Mortier,Boulevard Poniatowski,Boulevard Soult,Boulevard des Capucines,Boulevard de la Chapelle,Boulevard de Clichy,Boulevard du Crime,Boulevard du Général-d'Armée-Jean-Simon,Boulevard Haussmann,Boulevard de l'Hôpital,Boulevard des Italiens,Boulevard Lefebvre,Boulevard de la Madeleine,Boulevard de Magenta,Boulevard Malesherbes,Boulevard Marguerite-de-Rochechouart,Boulevard Montmartre,Boulevard du Montparnasse,Boulevard Raspail,Boulevard Richard-Lenoir,Boulevard Saint-Germain,Boulevard Saint-Michel,Boulevard de Sébastopol,Boulevard de Strasbourg,Boulevard du Temple,Boulevard Voltaire,Boulevard de la Zone"

// const boulevardArray = longString.split(",");
// console.table(boulevardArray);

// boulevardWithDe = boulevardArray.reduce((total, value) => {
// 	const lowerValue = value.toLowerCase();
// 	if(lowerValue.indexOf("de") !== -1){
// 		total.push(lowerValue);
// 	}
// 	return total;
// }, []);

// console.table(boulevardWithDe);

/* ------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------ */

const people = [
	'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
	'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
	'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
	'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
	'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
];
/* ------------------------------------------------------------------------------------ */

// 7. sort Exercise
// Sort the people alphabetically by last/first name
/* ------------------------------------------------------------------------------------ */

// const sorted = [...people].sort(compareFn);

// function compareFn(a, b){
// 	const [aLast, aFirst] = a.split(", ");
// 	const [bLast, bFirst] = b.split(", ");

// 	if(aFirst > bFirst){
// 		return 1;
// 	} else if(aFirst < bFirst){
// 		return -1;
// 	} else {
// 		return 0;
// 	}
// }

// console.table(sorted);

/* ------------------------------------------------------------------------------------ */

// const alpha = [...people].sort(comparedFn);

// function comparedFn(a, b){
// 	const [alast, afirst] = a.split(", ");
// 	const [blast, bfirst] = b.split(", ");

// 	return afirst > bfirst ? 1 : -1;
// }

// console.table(alpha);

// 8. Reduce Exercise
// Sum up the instances of each of these
/* ------------------------------------------------------------------------------------ */

const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

// const initialValue = {}
// const reducer = function(obj, value){
// 	if(!obj[value]){
// 		obj[value] = 1;
// 	} else {
// 		obj[value]++;
// 	}
// 	return obj;
// }

// const transportation = data.reduce(reducer, initialValue);
// console.log(transportation);

/* ------------------------------------------------------------------------------------ */

// const dataSummed = data.reduce((obj, item) => {
// 	if(!obj[item]){
// 		obj[item] = 0;
// 	} 
// 	obj[item]++;
// 	return obj;
// }, {});

// console.log(dataSummed);
