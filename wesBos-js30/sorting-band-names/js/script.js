const container = document.querySelector(".container");
const list = container.querySelector(".list");

const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const sorter = [...bands].sort(sortingFunction);

list.innerHTML = sorter.map(band => {
	return `<li class="list-item">${band}</li>`;
}).join("");

function sortingFunction(a, b){
	return (checkOnArticles(a) > checkOnArticles(b)) ? 1 : -1;
}

function checkOnArticles(arrayItem){
	const regex = /^(the|an|a)\s/i;
	return arrayItem.match(regex) ? arrayItem.replace(regex, "") : arrayItem;
}