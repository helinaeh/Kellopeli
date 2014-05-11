var canvas, ctx, bgImage, player, playerImg, obstacle, carImg, garImg, homeImg, workImg, delta;
var carKey, garageKey, homeKey, workKey, watchImg, logo, start, startText;
var playerSpriteX = 22, playerSpriteY = 28, bgX1 = 0, bgX2 = 900, points = 0, paused = true, speed = 2, speedTime = new Date().getTime();
var spriteSpeed = 500, pointSpeed = 100, sumOfDelta = 0, sumOfPoints = 0, lastCalledTime = new Date().getTime();
var intro, theme, menu, blip, laugh, obsoff, buttonImg;
var introSrc = "audio/intro.mp3", themeSrc = "audio/theme.mp3", menuSrc = "audio/menu.mp3";
var blipSrc = "audio/blip.mp3", laughSrc = "audio/laugh.mp3", obsoffSrc = "audio/obsoff.mp3";
var now = 0, seconds = null, startTextX = 393, startTextY = 425;

window.onload = function() {
	format();
	animate();
};

var format = function() {
	setCanvas();
	createPlayer();
	createObstacles();
	createKeys();
	createMenu();
	drawMenu();
	addEventListeners();	
};

var setCanvas = function() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	canvas.width = 900;
	canvas.height = 625;
	setBackground();
	setSounds();
	createButtons();
};

var setBackground = function() {
	bgImage = getImage("images/background.png");
	buttonImg = getImage("images/button.png");
}

var setSounds = function() {
	intro = document.getElementById("intro");
	theme = document.getElementById("theme");
	menu = document.getElementById("menu");
	blip = document.getElementById("blip");
	laugh = document.getElementById("laugh");
	obsoff = document.getElementById("obsoff");
	theme.loop = true;
	menu.loop = true;
};

var getImage = function(path) {
	var img = null;
	var ready = false;
	img = new Image();
	img.onload = function () {
		ready = true;
	};
	img.src = path;
	return img;
};

var createPlayer = function() {
	player = new Player(100, canvas.height/2-playerSpriteY/2); //x = canvas.width/2-playerSpriteX/2
	playerImg = getImage("images/playersprite.png");
	player.createKeys();
};

var createObstacles = function() {
	obstacle = new Array();
	carImg = getImage("images/carsprite.png");
	garImg = getImage("images/garagesprite.png");
	homeImg = getImage("images/homesprite.png");
	workImg = getImage("images/worksprite.png");
	wallImg = getImage("images/wallsprite.png");
};

var createKeys = function() {
	keyArray = new Array();
	carKey = getImage("images/carkey.png");
	garageKey = getImage("images/homekey.png");
	homeKey = getImage("images/garagekey.png");
	workKey = getImage("images/workkey.png");
	watchImg = getImage("images/watch.png");

};

var randomiseKeys = function() {
	keyArray[0] = new Key(200, "key1", speed);
	keyArray[1] = new Key(300, "key2", speed);
	keyArray[2] = new Key(400, "key3", speed);
};

var createMenu = function() {
	logo = getImage("images/logo.png");
};

//button object
function Button(xL, xR, yT, yB) {
	this.xLeft = xL;
	this.xRight = xR;
	this.yTop = yT;
	this.yBottom = yB;
}

Button.prototype.click = function(event) {
	var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    if (clickX >= this.xLeft && clickX <= this.xRight
    		&& clickY >= this.yTop && clickY <= this.yBottom) {
		return true;
	}
	return false;
};
//button object ends

var createButtons = function() {
	start = new Button(324, 575, 375, 450);
	startText = "START";
}

var drawMenu = function() {
	//background
	ctx.drawImage(bgImage, 0, 0, 900, 625, 0, 0, canvas.width, canvas.height);

	//score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "18px Georgia";
	ctx.fillText("SCORE", 110, 50);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "30px Georgia";
	ctx.fillText(points, 110, 80);

	//start text
	ctx.fillStyle = "#0c487c";
	ctx.font = "35px Georgia";
	ctx.fillText(startText, startTextX, startTextY);
	menu.play();
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
		/*if (e.keyCode == 37) {
			player.direction = directions[0];
			player.isMoving = true;
		}*/
		//up arrow
		if (e.keyCode == 38) {
			player.direction = directions[1];
			player.isMoving = true;
		}
		/*//right arrow
		if (e.keyCode == 39) {
			player.direction = directions[2];
			player.isMoving = true;
		}*/
		//down arrow
		if (e.keyCode == 40) {
			player.direction = directions[3];
			player.isMoving = true;
		}
	}, false);

	window.addEventListener("keyup", function(e) {
		player.isMoving = false;
	}, false);

	window.addEventListener("click", function(e) {
		//clicking on start button
		if (start.click(e)) {
			if (startText == "START") {
				points = 0;
				pointSpeed = 100;
				paused = false;
				menu.pause();
				intro.play();
				intro.addEventListener("timeupdate", function() {
					now = parseInt(intro.currentTime);
					if (now === 4) {
						theme.play();
					}
				}, false);
			}
			/*
			//clicking on menu button
			else if (startText == "MENU") {
				startText = "START";
				formatMenu();
			}
			*/
		}


	}, false);
	
};

var animate = function() {
	if (!paused) {
		timer();
		clear();
		render();
		update();
		isGameOver();
	}
	requestId = window.requestAnimationFrame(animate);
};

var timer = function() {
	delta = new Date().getTime() - lastCalledTime;
  	lastCalledTime = new Date().getTime();
  	sumOfDelta += delta;
  	sumOfPoints += delta;
};

var clear = function() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

var render = function() {

	//background fix
	ctx.fillStyle = "#0c487c";
	ctx.fillRect(0, 0, 900, 100);

	//background
	ctx.drawImage(bgImage, 0, 625, 900, 625, bgX1, 0, canvas.width, canvas.height);
	ctx.drawImage(bgImage, 0, 625, 900, 625, bgX2, 0, canvas.width, canvas.height);
	
	//obstacles
	for (var i = 0; i < obstacle.length; i++) {
		if (obstacle[i].type == 1) {
			if (obstacle[i].greyed == false) {
				ctx.drawImage(carImg, 0, 0, 35, 35, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
			}
			else {
				ctx.drawImage(carImg, 35, 0, 35, 35, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
			}
		}
		else if (obstacle[i].type == 2) {
			if (obstacle[i].greyed == false) {
				ctx.drawImage(garImg, 0, 0, 35, 70, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
			}
			else {
				ctx.drawImage(garImg, 35, 0, 35, 70, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
			}
		}
		else if (obstacle[i].type == 3) {
			if (obstacle[i].greyed == false) {
				ctx.drawImage(homeImg, 0, 0, 35, 105, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
			}
			else {
				ctx.drawImage(homeImg, 35, 0, 35, 105, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
			}
		}
		else if (obstacle[i].type == 4) {
			if (obstacle[i].greyed == false) {
				ctx.drawImage(workImg, 0, 0, 35, 140, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
			}
			else {
				ctx.drawImage(workImg, 35, 0, 35, 140, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
			}
		}
		else if (obstacle[i].type == "wal") {
			if (obstacle[i].greyed == false) {
				ctx.drawImage(wallImg, 0, 0, 35, 35, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
			}
			else {
				ctx.drawImage(wallImg, 35, 0, 35, 35, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
			}
		}
	}
	
	//keys on the game area
	for (var i = 0; i < keyArray.length; i++) {
		if (keyArray[i].id == "key1") {
			ctx.drawImage(carKey, 0, 0, 35, 35, keyArray[i].x, keyArray[i].y, 35, 35);
		}
		else if (keyArray[i].id == "key2") {
			ctx.drawImage(garageKey, 0, 0, 35, 35, keyArray[i].x, keyArray[i].y, 35, 35);
		}
		else if (keyArray[i].id == "key3") {
			ctx.drawImage(homeKey, 0, 0, 35, 35, keyArray[i].x, keyArray[i].y, 35, 35);
		}
		else if (keyArray[i].id == "key4") {
			ctx.drawImage(workKey, 0, 0, 35, 35, keyArray[i].x, keyArray[i].y, 35, 35);
		}
		else if (keyArray[i].id == "watch") {
			ctx.drawImage(watchImg, 0, 0, 35, 35, keyArray[i].x, keyArray[i].y, 35, 35);
		}
	}

	//player
	ctx.drawImage(playerImg, player.frameX*playerSpriteX, player.frameY*playerSpriteY, playerSpriteX, playerSpriteY, player.x, player.y, playerSpriteX, playerSpriteY);

	//keys the player has collected (menu)
	if (player.keys.key1 == true) {
		ctx.drawImage(carKey, 0, 0, 35, 35, 830, 32, 35, 35);
	}
	if (player.keys.key2 == true) {
		ctx.drawImage(garageKey, 0, 0, 35, 35, 760, 32, 35, 35);
	}
	if (player.keys.key3 == true) {
		ctx.drawImage(homeKey, 0, 0, 35, 35, 690, 32, 35, 35);
	}
	if (player.keys.key4 == true) {
		ctx.drawImage(workKey, 0, 0, 35, 35, 620, 32, 35, 35);
	}

	//points text
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "18px Georgia";
	ctx.fillText("SCORE", 110, 50);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "30px Georgia";
	ctx.fillText(points, 110, 80);

	//logo
	ctx.drawImage(logo, 0, 0, 277, 80, canvas.width/2-277/2, 10, 277, 80);

};

var update = function() {
	updateBg();
	player.move(canvas);
	for (var i = 0; i < obstacle.length; i++) {
		obstacle[i].move(canvas);
	}
	for (var i = 0; i < keyArray.length; i++) {
		keyArray[i].move(canvas);
	}
	collisionDetection();
	updateSprite();
	updateKeys();
	updateObstacleWall();
	updatePoints();
	updateSpeed();
};

var updateBg = function() {
	bgX1 -= speed * 1;
	if (bgX1 <= -900) {
		bgX1 = 900;
	}
	bgX2 -= speed * 1;
	if (bgX2 <= -900) {
		bgX2 = 900;
	}
};

var collisionDetection = function() {
	obsCollision();
	collectKey();
};

var obsCollision = function() {
	for (var i = 0; i <  obstacle.length; i++) {
		if (obstacle[i].greyed == false) {
			if (obstacle[i].x < player.x + player.width  && obstacle[i].x + obstacle[i].width  > player.x &&
					obstacle[i].y < player.y + player.height && obstacle[i].y + obstacle[i].height > player.y) {
				
				if (player.isMoving == false) {
					player.x = obstacle[i].x - player.width;
				}
				else if (player.direction == "right" && obstacle[i].x > player.x) {
					player.x = obstacle[i].x - player.width;
				}
				else if (player.direction == "left" && obstacle[i].x < player.x) {
					player.x = obstacle[i].x + obstacle[i].width;
				}
				else if (player.direction == "up" && obstacle[i].x > player.x) {
					player.x = obstacle[i].x - player.width;
				}
				else if (player.direction == "down" && obstacle[i].x > player.x) {
					player.x = obstacle[i].x - player.width;
				}
				else if (player.direction == "up" && obstacle[i].y < player.y) {
					player.y = obstacle[i].y + obstacle[i].height;
				}
				else if (player.direction == "down" && obstacle[i].y > player.y) {
					player.y = obstacle[i].y - player.height;
				}
			}
		}
	}
};

var collectKey = function() {
	for (var i = 0; i <keyArray.length; i++) {
		if (keyArray[i].x < player.x + player.width && keyArray[i].x + 35 > player.x &&
				keyArray[i].y < player.y + player.height && keyArray[i].y + 35 > player.y) {
			if (keyArray[i].id == "watch") {
				laugh.play();
			}
			else {
				blip.play();
			}
			player.addKey(keyArray[i].id);
			keyArray.splice(i, 1);
		}
	}
};

var updateSprite = function() {
	if (sumOfDelta >= spriteSpeed) {
		player.frameX++;
		player.moveRight();

		if (player.frameX >= 2) {
			player.frameX = 0;
		}
		sumOfDelta = 0;
	}
};

var updatePoints = function() {
	if (sumOfPoints >= pointSpeed) {
		points++;
		sumOfPoints = 0;
	}
};

var updateSpeed = function() {
	if (new Date().getTime() - speedTime > 7000 && speed <= 5) {
		speed *= 1.1;
		player.speed += 0.1;
		pointSpeed -= 5;

		speedTime = new Date().getTime();

		for (i = 0; i < obstacle.length; i++) {
			obstacle[i].speed = speed;
		}

		for (i = 0; i < keyArray.length; i++) {
			keyArray[i].speed = speed;
		}
	}
};

/*
var drawYouLostWindow = function() {
	//draw a box for the text
	ctx.fillStyle = "#0c487c";
	ctx.fillRect(300, 250, 300, 225); //sijainti, korkus

	//draw alert text about game ending
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.font = "30px Georgia";
	ctx.fillText("GAME OVER", 360, 330);

	//draw menu button
	ctx.drawImage(buttonImg, 0, 0, 251, 75, 324, 375, 251, 75);
	ctx.fillStyle = "#0c487c";
	ctx.font = "30px Georgia";
	startText = "MENU";
	ctx.fillText(startText, 400, 425);
};
*/

var formatMenu = function() {
	startText = "START";
	format();
	formatCounts();

	console.log("menu");
};

var formatCounts = function() {
	count = 0;
	speed = 2;
};

var isGameOver = function() {
	if (player.x + player.width < 0) {
		paused = true;
		intro.pause();
		theme.pause();
		//drawYouLostWindow();
		console.log("hävisit pelin");
		formatMenu();
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.font = "30px Georgia";
		ctx.fillText("GAME OVER", 360, 510);
	}
};


/*************/
/* ALGORITMI */
/*************/

var count = 0;
var obsProp = 0.7;
var yArray = [];
var a = 0, thisTime = new Date().getTime(), lastTime = thisTime, span = 0, keyAdded = false;
var key1Time = new Date().getTime(), key2Time = new Date().getTime(), key3Time = new Date().getTime();
var key4Time = new Date().getTime(), lastKeyMade = new Date().getTime();

var updateObstacleWall = function() {
	thisTime = new Date().getTime();

	span = thisTime - lastTime;

	if (span > 4000 / speed) {
		createObstacleWall(900, player.keys.key1, player.keys.key2, player.keys.key3, player.keys.key4);
		lastTime = thisTime;
	}
};

var updateKeys = function() {
	if (span > 2000 / speed && keyAdded == false) {

		if (player.keys.key1 == true && new Date().getTime() > key1Time + 32000 / speed) {
			obsoff.play();
			player.removeKey("key1");
		} else if (player.keys.key2 == true && new Date().getTime() > key2Time + 32000 / speed) {
			obsoff.play();
			player.removeKey("key2");
		} else if (player.keys.key3 == true && new Date().getTime() > key3Time + 32000 / speed) {
			obsoff.play();
			player.removeKey("key3");
		} else if (player.keys.key4 == true && new Date().getTime() > key4Time + 32000 / speed) {
			obsoff.play();
			player.removeKey("key4");
		}

		if (new Date().getTime() - key1Time > 22000 / speed
			&& new Date().getTime() - key2Time > 22000 / speed
			&& new Date().getTime() - key3Time > 22000 / speed
			&& new Date().getTime() - key4Time > 22000 / speed
			&& new Date().getTime() - lastKeyMade > 16000 / speed) {
				makeKey();
		}
		
		keyAdded = true;

	} else if (span < 2000 / speed && keyAdded == true) keyAdded = false;
};

var makeKey = function() {

	if (Math.random() < 0.2 && count > 2) {
		keyArray.push(new Key(randomKeyPosition(), "key1", speed));
		lastKeyMade = new Date().getTime();
		return;
	}

	if (Math.random() < 0.2 && count > 5) {
		keyArray.push(new Key(randomKeyPosition(), "key2", speed));
		lastKeyMade = new Date().getTime();
		return;
	}

	if (Math.random() < 0.2 && count > 7) {
		keyArray.push(new Key(randomKeyPosition(), "key3", speed));
		lastKeyMade = new Date().getTime();
		return;
	}

	if (Math.random() < 0.2 && count > 10) {
		keyArray.push(new Key(randomKeyPosition(), "key4", speed));
		lastKeyMade = new Date().getTime();
		return;
	}

	if (Math.random() < 0.2 && count > 12) {
		keyArray.push(new Key(randomKeyPosition(), "watch", speed));
		lastKeyMade = new Date().getTime();
	}
};

var createObstacleWall = function(x, car, hom, gar, wor) { // Parametrit ovat true/false-arvoja sen mukaan onko pelaajalla kyseistä avainta


	a = 0;

	yArray = [];

	addHole();

	addObstacles(x, car, hom, gar, wor);

	addWalls(x);

	count = count + 1;
};

var addHole = function() {
	var position = Math.round(Math.random() * 12);
	var holeSize = 4;
	var p = 0;

	do {
		yArray.push(position);
		position = position + 1;
		p = p + 1;
	} while (p < holeSize - Math.round(Math.random() - 0.4) - Math.floor(count / 25) 
		|| p < 2 - Math.round(Math.random() - 0.4));
};

var addObstacles = function(x, car, hom, gar, wor) {

	var position = 0;

	//adding work
	for (var i = 0; i < Math.floor(count / 10); i++) {
		if(Math.random() <= obsProp) {
			position = randomPosition(4);
			if (position != -1) {
				obstacle.push(new Work(x, position * 35 + 100, wor, speed));
				yArray.push(position, position+1, position+2, position+3);
				a = a + 1;
				break;
			}
		}
	}

	//adding home
	for (var i = 0; i < Math.floor(count / 7); i++) {
		if(Math.random() <= obsProp) {
			position = randomPosition(3);
			if (position != -1) {
				obstacle.push(new Home(x, position * 35 + 100, hom, speed));
				yArray.push(position, position+1, position+2);
				a = a + 1;
				break;
			}
		}
	}

	//adding garage
	for (var i = 0; i < Math.floor(count / 5); i++) {
		if(Math.random() <= obsProp) {
			position = randomPosition(2);
			if (position != -1) {
				obstacle.push(new Garage(x, position * 35 + 100, gar, speed));
				yArray.push(position, position+1);
				a = a + 1;
				break;
			}
		}
	}

	//adding car
	for (var i = 0; i < Math.floor(count / 2); i++) {
		if(Math.random() <= obsProp) {
			position = randomPosition(1);
			if (position != -1) {
				obstacle.push(new Car(x, position * 35 + 100, car, speed));
				yArray.push(position);
				a = a + 1;
				break;
			}
		}
	}
};

var addWalls = function(x) {
	for (var h = 0; h < 15; h++) {
		if (yArray.indexOf(h) == -1) {
			obstacle.push(new Wall(x, h * 35 + 100, speed));
		}
	}
};

var randomPosition = function(height) {
	var result = -1;

	for (var i = 0; i < 10; i++) {
		result = Math.round(Math.random() * 15);
		
		if (isEmpty(result, height)) {
			break;
		} else result = -1;
	}

	return result;
};

var isEmpty = function(position, height) {
	var res = true;

	for (var i = position; i < position + height; i++) {
		if (yArray.indexOf(i) != -1 || i > 14) res = false;
	}

	return res;
};

var randomKeyPosition = function() {
	var pos = Math.round(Math.random() * 13) + 1;

	pos = pos * 35 + 100;

	return pos;
};
