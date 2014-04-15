var canvas, ctx, bgImage, player, delta;
var playerSpriteX = 22, playerSpriteY = 28;
var spriteSpeed = 500, sumOfDelta = 0, lastCalledTime = new Date().getTime();

window.onload = function() {
	format();
	animate();
};

var format = function() {
	setCanvas();
	createPlayer();
};

var setCanvas = function() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	canvas.width = 888;
	canvas.height = 500;
	//setBackground();
};

var setBackground = function() {
	var bgReady = false;
	bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "images/background.png"; //tee tausta!
}

var createPlayer = function() {
	player = new Player(canvas.width/2-playerSpriteX/2, canvas.height/2-playerSpriteY/2);
	playerImg = player.getImage(player.spriteSrc);
};

var animate = function() {
	timer();
	clear();
	render();
	update();
	requestId = window.requestAnimationFrame(animate);
};

var timer = function() {
	delta = new Date().getTime() - lastCalledTime;
  	lastCalledTime = new Date().getTime();
  	sumOfDelta += delta;
};

var clear = function() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

var render = function() {
	//ctx.drawImage(bgImage, 0, 0, 400, 400, 0, 0, canvas.width, canvas.height);

	ctx.drawImage(playerImg, player.frameX*playerSpriteX, player.frameY*playerSpriteY, playerSpriteX, playerSpriteY, player.x, player.y, playerSpriteX, playerSpriteY);
};

var update = function() {
	player.move(canvas);

	updateSprite();
};

var updateSprite = function() {
	if (sumOfDelta >= spriteSpeed) {
		player.frameX++;
		if (player.frameX >= 2) {
			player.frameX = 0;
		}
		sumOfDelta = 0;
	}
};