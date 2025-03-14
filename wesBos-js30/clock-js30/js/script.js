const secondHand = document.querySelector(".second");
const minuteHand = document.querySelector(".minute");
const hourHand = document.querySelector(".hour");
// const tick = document.querySelector("audio");

function setTime(){
	const currentTime = new Date();
	const currentSecond = currentTime.getSeconds();
	const currentMinute = currentTime.getMinutes();
	const currentHour = currentTime.getHours();

	secondHandPosition(currentSecond);
	minuteHandPosition(currentMinute);
	hourHandPosition(currentHour);
}

function secondHandPosition(value){
	const degree = (((value / 60) * 360));

	if(!degree) resetTransition(secondHand);

	// tick.currentTime = 0;
	// tick.play();
	secondHand.style.transform = `rotate(${degree}deg)`;
}

function minuteHandPosition(value){
	const degree = (((value / 60) * 360));

	if(!degree) resetTransition(minuteHand);
	minuteHand.style.transform = `rotate(${degree}deg)`;
}

function hourHandPosition(value){
	const degree = (((value / 12) * 360));

	if(degree === 360 || degree === 720) resetTransition(hourHand);
	hourHand.style.transform = `rotate(${degree}deg)`;
}

function resetTransition(element){
    element.style.transition = "none";
    setTimeout(() => element.style.transition = null, 500);
}

setInterval(setTime, 1000);

