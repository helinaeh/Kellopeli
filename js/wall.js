function Wall(y) {
	Obstacle.call(y, "images/wallsprite.png", wal, 10);
}

Wall.prototype = new Obstacle();