const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

let drawingFlag = false;
let direction = true;
let baseColor = 0;
let positionX = 0;
let positionY = 0;

canvas.addEventListener("mousedown", getInitialPosition);
canvas.addEventListener("mouseup", () => drawingFlag = false);
canvas.addEventListener("mouseout", () => drawingFlag = false);
canvas.addEventListener("mousemove", drawLine);

function getInitialPosition(event){
	drawingFlag = true;
	[positionX, positionY] = [event.offsetX, event.offsetY];
}

function drawLine(event){
	if(!drawingFlag) return;

	ctx.beginPath();
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.strokeStyle = `hsl(${baseColor}, 100%, 50%)`;
	// ctx.globalCompositeOperation = "difference";
	// ctx.globalCompositeOperation = "xor";
	// ctx.globalCompositeOperation = "copy";
	// ctx.globalCompositeOperation = "source-out";
	ctx.moveTo(positionX, positionY);
	ctx.lineTo(event.offsetX, event.offsetY);
	ctx.stroke();

	if(baseColor > 360){
		baseColor = 0;
	} else {
		baseColor++;
	}

	if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
		direction = !direction;
	}

	if(direction){
		ctx.lineWidth++;
	} else {
		ctx.lineWidth--;
	}

	[positionX, positionY] = [event.offsetX, event.offsetY];
}

