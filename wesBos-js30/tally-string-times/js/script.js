
const list = document.querySelector(".videos");
const listItems = list.querySelectorAll("[data-time]");

const totalTimeInSeconds = Array.from(listItems).reduce((total, item) => {
	const timeString = item.dataset.time;
	const [min, sec] = timeString.split(":");
	const itemSeconds = parseFloat(min) * 60 + parseFloat(sec);

	return (total + itemSeconds);
}, 0);

console.log(totalTimeInSeconds);

function convertInFullTime(seconds){
	const hours = Math.floor(seconds / 3600);
	let secondsLeft = seconds % 3600;

	const minutes = Math.floor(secondsLeft / 60);
	secondsLeft %= 60;

	console.log(hours + ":" + minutes + ":" + secondsLeft);
}

convertInFullTime(totalTimeInSeconds);