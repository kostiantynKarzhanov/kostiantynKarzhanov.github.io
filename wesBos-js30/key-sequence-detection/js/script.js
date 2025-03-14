const pressedKeys = [];
const secretWord = "avadakedavra";

window.addEventListener("keydown", (event) => {
	pressedKeys.push(event.key);
	pressedKeys.splice(-secretWord.length - 1, pressedKeys.length - secretWord.length);
	if(pressedKeys.join("").includes(secretWord)){
		cornify_add();
	};
})