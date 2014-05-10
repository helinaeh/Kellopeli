function Wall(x, y) {
	Obstacle.call(this, x, y, "images/carsprite.png", "wal", 35, false); // sprite täytyy muuttaa !!! käyttää carspriteä
}

Wall.prototype = new Obstacle();