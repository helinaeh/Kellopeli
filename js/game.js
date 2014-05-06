var canvas, ctx, bgImage, player, playerImg, obstacle, carImg, delta;
var playerSpriteX = 22, playerSpriteY = 28, bgX1 = 0, bgX2 = 900;
var spriteSpeed = 500, sumOfDelta = 0, lastCalledTime = new Date().getTime();

window.onload = function() {
	format();
	animate();
};

var format = function() {
	setCanvas();
	createPlayer();
	createObstacles();
	addEventListeners();
};

var setCanvas = function() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	canvas.width = 900;
	canvas.height = 525;
	setBackground();
};

//kaikkien getImagejen siirtäminen playerilta ja obstaclelta game-luokkaan!!!
var setBackground = function() {
	var bgReady = false;
	bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "images/background.png";
}

var createPlayer = function() {
	player = new Player(canvas.width/2-playerSpriteX/2, canvas.height/2-playerSpriteY/2);
	playerImg = player.getImage(player.spriteSrc);
	player.createKeys();
	//player.addKey("key1");
};

var createObstacles = function() {
	obstacle = new Array();
	randomiseObstacles();
};

var randomiseObstacles = function() {
	var obsImages = new Array();
	obsImages.push(false, false, false, false); //PAREMPI VAIHTOEHTO: luodaan kaikkien esteiden kuvat heti alussa!
	obstacle[0] = new Car(200, false);
	obstacle[1] = new Car(300, false);
	carImg = obstacle[0].getImage();

	/*
	
	while () { //niin kauan, kun peli jatkuu
		//luo uusi random este
		//tutkitaan, mikä esteen avainluku on (eli mikä este kyseessä)
		//jos obsImages[avainluku-1] == true, niin ei lisätä kuvaa
		//jos false, niin getImage();
	}

	*/
};

var addEventListeners = function() {
	directions = new Array();
	directions[0] = "left";
	directions[1] = "up";
	directions[2] = "right";
	directions[3] = "down";

	//disable default use of arrow keys
	window.addEventListener("keydown", function(e) {
    	if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        	e.preventDefault();
    	}
	}, false);

	//use of arrow keys
	window.addEventListener("keydown", function(e) {
		//left arrow
		if (e.keyCode == 37) {
			player.direction = directions[0];
			player.isMoving = true;
		}
		//up arrow
		if (e.keyCode == 38) {
			player.direction = directions[1];
			player.isMoving = true;
		}
		//right arrow
		if (e.keyCode == 39) {
			player.direction = directions[2];
			player.isMoving = true;
		}
		//down arrow
		if (e.keyCode == 40) {
			player.direction = directions[3];
			player.isMoving = true;
		}
	}, false);

	window.addEventListener("keyup", function(e) {
		player.isMoving = false;
	}, false);
	
};

var animate = function() {
	timer();
	clear();
	render();
	update();
	requestId = window.requestAnimationFrame(animate);
	/*
	window.setTimeout(function() {
		requestId = window.requestAnimationFrame(animate);	
	}, 3000);
	*/
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
	updateBg();
	ctx.drawImage(bgImage, 0, 0, 900, 500, bgX1, 0, canvas.width, canvas.height);
	ctx.drawImage(bgImage, 0, 0, 900, 500, bgX2, 0, canvas.width, canvas.height);
	ctx.drawImage(playerImg, player.frameX*playerSpriteX, player.frameY*playerSpriteY, playerSpriteX, playerSpriteY, player.x, player.y, playerSpriteX, playerSpriteY);
	ctx.drawImage(carImg, 0, 0, 35, 35, obstacle[0].x, obstacle[0].y, obstacle[0].width, obstacle[0].height);
};

var updateBg = function() {
	bgX1--;
	if (bgX1 <= -900 ) {
		bgX1 = 900;
	}
	bgX2--;
	if (bgX2 <= -900 ) {
		bgX2 = 900;
	}
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