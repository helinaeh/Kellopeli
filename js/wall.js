function Wall(x, y, speed) {
	Obstacle.call(this, x, y, "images/carsprite.png", "wal", 35, false, speed); // sprite täytyy muuttaa !!! käyttää carspriteä
}

Wall.prototype = new Obstacle();