const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");
const clearBtn = document.querySelector("#jsClear");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// 픽셀을 다루는 윈도우가 얼마나 큰지 canvas에게 알려주기 위해 width와 height 사이즈를 주는 것

ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if(!painting) {
		ctx.beginPath(); // 경로 생성
		ctx.moveTo(x, y); // 선 시작 좌표
	} else {
		ctx.lineTo(x, y); // 선 끝 좌표
		ctx.stroke(); // 선 그리기
	}
} 

function changeColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event) {
	const size = event.target.value;
	ctx.lineWidth = size;
}

function handleModeClick(event) {
	if(filling === true) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
}

function handleCanvasClick() {
	if(filling) {
	ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

function handleContextMenu(event) {
	event.preventDefault();
}

function handleSaveClick() {
	const image = canvas.toDataURL("image/png");
	const link = document.createElement("a");
	link.href = image;
	link.download = "🎨";
	link.click();
}

function handleCanvasClear(event) {
	ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	ctx.beginPath();
}

if(canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleContextMenu);
}

if(colors) {
	Array.from(colors).forEach(color => 
		color.addEventListener("click", changeColorClick));
}

if(range) {
	range.addEventListener("input", handleRangeChange);
}

if(mode) {
	mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
	saveBtn.addEventListener("click", handleSaveClick);
}

if(clearBtn) {
	clearBtn.addEventListener("click", handleCanvasClear);
}
