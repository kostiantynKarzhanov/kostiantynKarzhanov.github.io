// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.

// Let's start with an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy', ["deep", "dark", "array"]];

// we have 4 options to make shallow copy of it:

// const playersCopy = [].concat(players);
// const playersCopy = players.slice();
// const playersCopy = [...players];
const playersCopy = Array.from(players);

playersCopy[0] = "Elon";
playersCopy[1] = "Gin";
playersCopy[2] = "Valeriya";
playersCopy[3] = "Eugene";
playersCopy[4][0] = "shallow";
playersCopy[4][1] = "clear";
playersCopy[4][2] = "arr";

console.log(players);
console.log(playersCopy);

// The same thing goes for objects. we have 2 options to make a shallow copy:

const person = {
	name: 'Elon',
	age: 30,
	background: {
		education: "engineer",
		"years of experience": 10,
		address: {
			country: "Ukraine",
			state: "Kievska Oblast",
			street: "Bogdana Chmelnitskogo",
		}
	}
};

// const personCopy = Object.assign({}, person, { name: "Gin", age: "30"});
// const personCopy = {...person}

// and 3 more options to make a deep copy:
// const personCopy = JSON.parse(JSON.stringify(person)); 
// const personCopy = structuredClone(person);
// deep cloning with recursion

const personCopy = {};	

function cloneDeep(objToCopy, clone){
	for(key in objToCopy){
		clone[key] = objToCopy[key];

		if(typeof objToCopy[key] === "object"){
			clone[key] = Object.assign({}, cloneDeep(objToCopy[key], {}));
		}
	}
	return clone;
}
cloneDeep(person, personCopy);

personCopy.name = "Gin";
personCopy.age = 30;
personCopy.background.education = "english teacher";
personCopy.background["years of experience"] = 12;
personCopy.background.address.country = "USA";
personCopy.background.address.state = "California";
personCopy.background.address.street = "Kennedy St";

console.log(person);
console.log(personCopy);
console.log(person.background === personCopy.background);
console.log(person.background.address === personCopy.background.address);
