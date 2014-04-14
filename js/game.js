window.onload = function() {
	format();
	animate();
};

var format = function() {
	setCanvas();
};

var setCanvas = function() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	canvas.width = 888;
	canvas.height = 500;
	setBackground();
};

var animate = function() {

};