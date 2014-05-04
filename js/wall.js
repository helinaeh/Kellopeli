function Wall(y, greyed) {
	Obstacle.call(y, "images/wallsprite.png", wal, 10, greyed);
}

Wall.prototype = new Obstacle();