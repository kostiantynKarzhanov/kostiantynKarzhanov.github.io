const container = document.querySelector(".container");
const hero = container.querySelector(".hero");
const walk = 200;

container.addEventListener("mousemove", showShadow);

function showShadow(event){
	const target = event.target;
	let {offsetX: x, offsetY: y} = event;
	const {offsetWidth: width, offsetHeight: height} = this;

	if(target !== this){
		x += target.offsetLeft;
		y += target.offsetTop;
	}

	shadowX = Math.round((x / width * walk) - (walk / 2));
	shadowY = Math.round((y / width * walk) - (walk / 2));

	hero.style.textShadow = `
	${shadowX}px ${shadowY * -1}px 5px hsl(300, 100%, 50%),
	${shadowX * -1}px ${shadowY}px 5px hsl(270, 50%, 40%),
	${shadowY}px ${shadowX * -1}px 5px hsl(105, 100%, 60%),
	${shadowY * -1}px ${shadowX}px 5px hsl(0, 100%, 100%)`;
}