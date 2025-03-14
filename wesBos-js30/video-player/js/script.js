const player = document.querySelector(".player");
const videoViewer = player.querySelector(".player__viewer");
const videoControls = player.querySelector(".player__controls");
const toggleButton = videoControls.querySelector(".toggle");
const forwardSkipButton = videoControls.querySelector(".forward-skip");
const backwardSkipButton = videoControls.querySelector(".backward-skip");
const progressBar = videoControls.querySelector("#progress-bar");
const ranges = videoControls.querySelectorAll("[type='range']");
let mousedownFlag = false;

videoViewer.addEventListener("loadedmetadata", setProgressBarLength);
videoViewer.addEventListener("timeupdate", updateProgressBar);
videoViewer.addEventListener("play", updateToggleIcon);
videoViewer.addEventListener("pause", updateToggleIcon);
document.addEventListener("keydown", doActionDependingOnPressedKey);
player.addEventListener("click", doActionDependingOnTarget);

ranges.forEach(range => {
	range.addEventListener("mousedown", () => mousedownFlag = true);
	range.addEventListener("mouseup", () => mousedownFlag = false);
	range.addEventListener("mousemove", updateRangeValue);
})

function doActionDependingOnPressedKey(event){
	const pressedKey = event.key;
	if(pressedKey === " "){
		playOrPause();
	} else if(pressedKey === "Enter"){
		turnOnFullScreen();
	} else if(pressedKey === "ArrowRight" || pressedKey === "ArrowLeft"){
		if(pressedKey == "ArrowRight"){
			videoViewer.currentTime += parseFloat(forwardSkipButton.dataset.skip);
		} else if(pressedKey == "ArrowLeft"){
			videoViewer.currentTime += parseFloat(backwardSkipButton.dataset.skip);
		}
	}
}

function doActionDependingOnTarget(event){
	const targetElement = event.target;
	
	if(targetElement === videoViewer || targetElement === toggleButton){
		playOrPause();
	} else if(targetElement.matches(".full-screen")){
		turnOnFullScreen();
	} else if(targetElement.matches("[data-skip]")){
		videoViewer.currentTime += parseFloat(targetElement.dataset.skip);
	} else if(targetElement.matches("[type='range']")){
		videoViewer[targetElement.name] = targetElement.value;
	}
}

function playOrPause(){
	const method = videoViewer.paused ? "play" : "pause";
	videoViewer[method]();
	updateToggleIcon();
}

function updateToggleIcon(){
	const icon = videoViewer.paused ? "►" : "❚❚";
	toggleButton.textContent = icon;
}

function setProgressBarLength(){
	progressBar.max = videoViewer.duration;
}

function updateProgressBar(){
	progressBar.value = videoViewer.currentTime;
}

function updateRangeValue(){
	if(!mousedownFlag) return;
	videoViewer[this.name] = this.value;
}

function turnOnFullScreen(){
	if(videoViewer.requestFullscreen){
		videoViewer.requestFullscreen();
	}
}