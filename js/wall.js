function Wall(y) {
	Obstacle.call(this, y, "images/carsprite.png", "wal", 35, false); // sprite täytyy muuttaa !!! käyttää carspriteä
}

Wall.prototype = new Obstacle();