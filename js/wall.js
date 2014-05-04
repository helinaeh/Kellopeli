function Wall(y) {
	Obstacle.call(y, "images/wallsprite.png", "wal", 50, false);
}

Wall.prototype = new Obstacle();