function Player(x, y) {
	this.x = x;
	this.y = y;
	this.speed = 4;
	this.spriteSrc = "images/playersprite.png"; //tee uusi hahmo
	this.width = 22; //määrittele spritesheetin perusteella!!!
	this.height = 28;
	this.characterImage = null;
	this.frameX = 0;
	this.frameY = 0;
	this.keys = {};
	this.isMoving = false;
	this.direction = null;
}

Player.prototype.createKeys = function() {
	this.keys.key1 = false;
	this.keys.key2 = false;
	this.keys.key3 = false;
	this.keys.key4 = false;
	console.log(this.keys);
};

Player.prototype.addKey = function(id) {
	if (id == "key1") {
		this.keys.key1 = true;
	}
	else if (id == "key2") {
		this.keys.key2 = true;
	}
	else if (id == "key3") {
		this.keys.key3 = true;
	}
	else if (id == "key4") {
		this.keys.key4 = true;
	}
	else if (id == "watch") {
		this.keys.key1 = true;
		this.keys.key2 = true;
		this.keys.key3 = true;
		this.keys.key4 = true;
	}
};

Player.prototype.removeKey = function(id) {
	if (id == "key1") {
		this.keys.key1 = false;
	}
	else if (id == "key2") {
		this.keys.key2 = false;
	}
	else if (id == "key3") {
		this.keys.key3 = false;
	}
	else if (id == "key4") {
		this.keys.key4 = false;
	}
	else if (id == "watch") {
		this.keys.key1 = false;
		this.keys.key2 = false;
		this.keys.key3 = false;
		this.keys.key4 = false;
	}
};

Player.prototype.hasKeys = function() { // kertoo onko pelaajalla ollenkaan avaimia
	if (this.keys.key1 == true || this.keys.key2 == true || this.keys.key3 == true || this.keys.key4 == true) {
		return true;
	} else return false;
}

Player.prototype.move = function(canvas) {
	this.canvas = canvas;
	if (this.isMoving === true) {
		if (this.direction === "left") {
			this.moveLeft();
		}
		if (this.direction === "up") {
			this.moveUp();
		}
		if (this.direction === "right") {
			this.moveRight();
		}
		if (this.direction === "down") {
			this.moveDown();
		}
	}
	else {
		this.frameY = 0;
	}
};


Player.prototype.moveLeft = function() {
	if (this.x > 0) {
		this.x -= this.speed;
		this.frameY = 3;
	}
	else {
		this.x = 0;
	}
};

Player.prototype.moveUp = function() {
	if (this.y > 100) {
		this.y -= this.speed;
		this.frameY = 2;
	}
	else {
		this.y = 100;
	}
};

Player.prototype.moveRight = function() {
	if (this.x < canvas.width - this.width) {
		this.x += this.speed;
		this.frameY = 4;
	}
	else {
		this.x = canvas.width - this.width;
	}
};

Player.prototype.moveDown = function() {
	if (this.y < canvas.height - this.height) {
		this.y += this.speed;
		this.frameY = 1;
	}
	else {
		this.y = canvas.height - this.height;
	}
};