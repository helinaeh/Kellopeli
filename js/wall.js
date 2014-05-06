function Wall(y) {
	Obstacle.call(this, y, "images/wallsprite.png", "wal", 50, false);
}

Wall.prototype = new Obstacle();