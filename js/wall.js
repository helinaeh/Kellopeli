function Wall(y) {
	Obstacle.call(y, "images/wallsprite.png", wal, 10, false);
}

Wall.prototype = new Obstacle();