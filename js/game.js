var canvas, ctx, bgImage, player, playerImg, obstacle, carImg, garImg, homeImg, workImg, delta;
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

var setBackground = function() {
	bgImage = getImage("images/background.png");
}

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
	player = new Player(canvas.width/2-playerSpriteX/2, canvas.height/2-playerSpriteY/2);
	//playerImg = player.getImage(player.spriteSrc); //getImage käyttäen playerin omaa metodia
	playerImg = getImage("images/playersprite.png");
	player.createKeys();
	//player.addKey("key1");
};

var createObstacles = function() {
	obstacle = new Array();
	carImg = getImage("images/carsprite.png");
	garImg = getImage("images/garagesprite.png");
	homeImg = getImage("images/homesprite.png");
	workImg = getImage("images/worksprite.png");
	wallImg = getImage("images/wallsprite.png");
	//randomiseObstacles();
	createObstacleWall();
};

/*
var randomiseObstacles = function() {
	obstacle[0] = new Car(200, false);
};
*/

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
	ctx.drawImage(bgImage, 0, 0, 900, 525, bgX1, 0, canvas.width, canvas.height);
	ctx.drawImage(bgImage, 0, 0, 900, 525, bgX2, 0, canvas.width, canvas.height);
	ctx.drawImage(playerImg, player.frameX*playerSpriteX, player.frameY*playerSpriteY, playerSpriteX, playerSpriteY, player.x, player.y, playerSpriteX, playerSpriteY);
	for (var i = 0; i < obstacle.length; i++) {
		//console.log(i);
		if (obstacle[i].type == 1) {
			ctx.drawImage(carImg, 0, 0, 35, 35, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
		}
		else if (obstacle[i].type == 2) {
			ctx.drawImage(garImg, 0, 0, 35, 35, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
		}
		else if (obstacle[i].type == 3) {
			ctx.drawImage(homeImg, 0, 0, 35, 35, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
		}
		else if (obstacle[i].type == 4) {
			ctx.drawImage(workImg, 0, 0, 35, 35, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
		}
		else if (obstacle[i].type == "wal") {
			ctx.drawImage(wallImg, 0, 0, 35, 35, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
		}
	}
};

var update = function() {
	updateBg();
	player.move(canvas);
	for (var i = 0; i < obstacle.length; i++) {
		//console.log("este nro " + i, obstacle[i]);

		obstacle[i].move(canvas);
	}
	collisionDetection();
	updateSprite();
	updateObstacleWall();
	updateKeys();
};

var updateBg = function() {
	bgX1--;
	if (bgX1 <= -900) {
		bgX1 = 900;
	}
	bgX2--;
	if (bgX2 <= -900) {
		bgX2 = 900;
	}
};

var collisionDetection = function() { //muokkaa törmäystestit toimiviksi!!!!!
	for (var i = 0; i <  obstacle.length; i++) {
		if (obstacle[i].greyed == false) {		// jotta "harmaana" olevista esteistä pääsee läpi, testattu ja toimii
			if (obstacle[i].x < player.x + player.width  && obstacle[i].x + obstacle[i].width  > player.x &&
					obstacle[i].y < player.y + player.height && obstacle[i].y + obstacle[i].height > player.y) {
				
				if (player.isMoving == false) { //jos pelaaja ei liiku
					player.x = obstacle[i].x - player.width;
				}
				else if (player.direction == "right" && obstacle[i].x > player.x) { //jos pelaaja yrittää mennä oikealle JA este on oikealla
					player.x = obstacle[i].x - player.width;
				}
				else if (player.direction == "left" && obstacle[i].x < player.x) { //jos pelaaja yrittää mennä vasemmalle JA este on vasemmalla
					player.x = obstacle[i].x + obstacle[i].width;
				}
				else if (player.direction == "up" && obstacle[i].y < player.y) { //jos pelaaja yrittää mennä ylös JA este on yläpuolella
					player.y = obstacle[i].y + obstacle[i].height;
				}
				else if (player.direction == "down" && obstacle[i].y > player.y) { //jos pelaaja yrittää mennä alas JA este on alapuolella
					player.y = obstacle[i].y - player.height;
				}
				else if (player.direction == "up" && obstacle[i].x > player.x) { //jos pelaaja yrittää mennä ylös JA este on oikealla
					player.x = obstacle[i].x - player.width;
					
				}
				else if (player.direction == "down" && obstacle[i].x > player.x) { //jos pelaaja yrittää mennä alas JA este on oikealla
					player.x = obstacle[i].x - player.width;
				}

				console.log("Törmäys!");
			}
		}
	}
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



/*************/
/* ALGORITMI */
/*************/

var count = 0; // +1 aina kun uusi seinämä tehdään
var obsProp = 0.3; // todnäk jolla seinään tulee "avattava" este
var yArray = [];
var a = 0;
var thisTime = new Date().getTime();
var lastTime = thisTime;
var span = 0;
var keysAdded = false;

var updateObstacleWall = function() {
	//console.log("menee updateObstacleWalliin");
	thisTime = new Date().getTime();
	span = thisTime - lastTime;
	if (span > 4000) {
		createObstacleWall(player.keys.key1, player.keys.key2, player.keys.key3, player.keys.key4);
		//console.log("menee iffiin");
		lastTime = thisTime;
	}
}

var updateKeys = function() {
	thisTimeKeys = new Date().getTime();
	if (span > 2000 && keysAdded == false) {
		addKeys;
		keysAdded = true;
	} else if (span < 2000 && keysAdded == true) keysAdded = false;
}

var createObstacleWall = function(position, car, hom, gar, wor) { // Parametrit ovat true/false-arvoja sen mukaan onko pelaajalla kyseistä avainta

	//console.log("tulee algoritmiin");

	a = 0; // +1 kun lisätään seinämään este
	/* 
	Anyway siihen lisätään esteen täyttämät "indeksit" kun se este luodaan (jos esim este
	jonka korkeus on 140 lisätään kohtaan 105, niin se täyttää indeksit 105/35=3, 140/35=4,
	175/35=5, 210/35=6)
	*/
	yArray = [];

	addHole();

	addObstacles(car, hom, gar, wor);

	addWalls();

	count = count + 1;
}

var addHole = function() {
	var position = Math.round(Math.random() * 12);
	var holeSize = 3;
	var x = 0;
	if (count > 80 && Math.random() < 0.03) return;
	do {
		yArray.push(position);
		position = position + 1;
		x = x + 1;
	} while (x < holeSize - Math.round(Math.random() - 0.4) - Math.floor(count / 25));
	//console.log("kolo lisätty");
}

var addObstacles = function(car, hom, gar, wor) {

	var position = 0;

	for (var i = 0; i < Math.floor(count / 20); i++) { //lisätään työpaikka (ehkä)
		if(Math.random() <= obsProp) {
			position = randomPosition(4);
			if (position != -1) {
				obstacle.push(new Work(position * 35, wor));
				yArray.push(position, position+1, position+2, position+3); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}

	for (i = 0; i < Math.floor(count / 15); i++) { //lisätään koti (ehkä)
		if(Math.random() <= obsProp) {
			position = randomPosition(3);
			if (position != -1) {
				obstacle.push(new Home(position * 35, hom));
				yArray.push(position, position+1, position+2); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}

	for (i = 0; i < Math.floor(count / 10); i++) { //lisätään autotalli (ehkä)
		if(Math.random() <= obsProp) {
			position = randomPosition(2);
			if (position != -1) {
				obstacle.push(new Garage(position * 35, gar));
				yArray.push(position, position+1); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}

	for (i = 0; i < Math.floor(count / 5); i++) { //lisätään auto (ehkä)
		if(Math.random() <= obsProp) {
			position = randomPosition(1);
			if (position != -1) {
				//console.log(position);
				obstacle.push(new Car(position * 35, car));
				yArray.push(position); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
				//console.log("auto lisätty");
			}
		}
	}
}

var addWalls = function() {
	for (var h = 0; h < 15; h++) { // käy läpi indeksit
		if (yArray.indexOf(h) == -1) {
			obstacle.push(new Wall(h*35));
			//console.log("seinä lisätty");
		} // lisää seinän (joka on 35px korkea)
	}
	//console.log("eka este: " + obstacle[1]);
}

var randomPosition = function(height) {
	var result = -1;
	/*
	ensimmäinen versio, tämä olisi jatkanut paikan arpomista loputtomiin jos tarpeeksi isoa paikkaa ei ole
	do {
		result = Math.round(Math.random() * 10);
	} while (!isEmpty(result, height));
	*/
	for (var i = 0; i < 10; i++) {
		result = Math.round(Math.random() * 15);
		if (isEmpty(result, height)) {
			break;
		} else result = -1;
	}

	return result;
}

var isEmpty = function(position, height) {
	var res = false;
	for (var i = position; i < position + height; i++) {
		if (yArray.indexOf(i) == -1) res = true;
	}
	return res;
}
