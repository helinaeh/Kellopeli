function Work(y, greyed) {
	Obstacle.call(y, "images/worksprite.png", 4, 200, greyed);
}

Work.prototype = new Obstacle();