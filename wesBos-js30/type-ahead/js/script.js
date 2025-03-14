const inputField = document.querySelector("#search-field");
const suggestions = document.querySelector(".search__suggestions");
const places = [];
const url = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

fetch(url)
	.then(response => response.json())
	.then(data => places.push(...data));

function findMatches(wordToMatch, places){
	return places.filter(place => {
		const regex = new RegExp(wordToMatch, "gi");
		return place.city.match(regex) || place.state.match(regex);
	})
}

function displayMatches(){
	const placesMatched = findMatches(this.value, places);
	const html = placesMatched.map(place => {
		const regex = new RegExp(this.value, "gi");
		const cityName = place.city.replace(regex, `<span class="city-hl">${this.value}</span>`);
		const stateName = place.state.replace(regex, `<span class="state-hl">${this.value}</span>`); 

		return `<li class="search__suggestions-item"><span>${cityName}, ${stateName}</span><span class="population">${numberWithCommas(place.population)}</span></li>`
	}).join("");

	suggestions.innerHTML = html;
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

inputField.addEventListener("keyup", displayMatches);


