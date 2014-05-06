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
	//randomiseObstacles();
	createObstacleWall();
};

var randomiseObstacles = function() {
	var obsImages = new Array();
	obsImages.push(false, false, false, false); //PAREMPI VAIHTOEHTO: luodaan kaikkien esteiden kuvat heti alussa!
	obstacle[0] = new Car(200, false);
	//obstacle[1] = new Car(300, false);
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
	ctx.drawImage(bgImage, 0, 0, 900, 500, bgX1, 0, canvas.width, canvas.height);
	ctx.drawImage(bgImage, 0, 0, 900, 500, bgX2, 0, canvas.width, canvas.height);
	ctx.drawImage(playerImg, player.frameX*playerSpriteX, player.frameY*playerSpriteY, playerSpriteX, playerSpriteY, player.x, player.y, playerSpriteX, playerSpriteY);
	for (var i = 0; i < obstacle.length; i++) {
		if (obstacle[i].type == 1) {
			ctx.drawImage(carImg, 0, 0, 35, 35, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
		}
	}
};

var update = function() {
	updateBg();
	player.move(canvas);
	for (var i = 0; i < obstacle.length; i++) {
		obstacle[i].move(canvas);
	}
	collisionDetection();
	updateSprite();
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

var collisionDetection = function() {
	
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



// ALGORITMI ---------------------------------------------------

var count = 0; // +1 aina kun uusi seinämä tehdään
var obsProp = 0.1; // todnäk jolla seinään tulee "avattava" este
var yArray = [];
var a = 0;

var createObstacleWall = function(car, hom, gar, wor, watch) { // Parametrit ovat true/false-arvoja sen mukaan onko pelaajalla kyseistä avainta

	console.log("tulee algoritmiin");

	a = 0; // +1 kun lisätään seinämään este
	/* 
	Anyway siihen lisätään esteen täyttämät "indeksit" kun se este luodaan (jos esim este
	jonka korkeus on 140 lisätään kohtaan 105, niin se täyttää indeksit 105/35=3, 140/35=4,
	175/35=5, 210/35=6)
	*/
	yArray = [];

	addHole();

	addObstacles(car, hom, gar, wor, watch);

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
	} while (x < holeSize - Math.round(Math.random() - 0.4) - (count % 25));
}

var addObstacles = function(car, hom, gar, wor, watch) {

	var position = 0;

	for (var i = 0; i < count % 40; i++) { //lisätään työpaikka (ehkä)
		if(Math.random() <= obsProp * 0.4) {
			position = randomPosition(4);
			if (position != -1) {
				obstacle.push(new Work(position, wor || watch));
				yArray.push(position, position+1, position+2, position+3); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}

	for (i = 0; i < count % 30; i++) { //lisätään koti (ehkä)
		if(Math.random() <= obsProp * 0.6) {
			position = randomPosition(3);
			if (position != -1) {
				obstacle.push(Home(position, hom || watch));
				yArray.push(position, position+1, position+2); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}

	for (i = 0; i < count % 20; i++) { //lisätään autotalli (ehkä)
		if(Math.random() <= obsProp * 0.8) {
			position = randomPosition(2);
			if (position != -1) {
				obstacle.push(new Garage(position, gar || watch));
				yArray.push(position, position+1); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}

	for (i = 0; i < count % 10; i++) { //lisätään auto (ehkä)
		if(Math.random() <= obsProp) {
			position = randomPosition(1);
			if (position != -1) {
				obstacle.push(new Car(position, car || watch));
				yArray.push(position); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}
}

var addWalls = function() {
	for (var h = 0; h < 15; h++) { // käy läpi indeksit
		if (yArray.indexOf(h) == -1) {
			console.log("menee iffiin");
			obstacle.push(new Wall(h*35));
		} // lisää seinän (joka on 35px korkea)
	}
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

var isEmpty = function(result, height) {
	var res = false;
	for (var i = result; i < result + height; i++) {
		if (yArray.indexOf(i) != -1) res = true;
	}
	return res;
}
