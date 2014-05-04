function Work(y, greyed) {
	Obstacle.call(y, "images/worksprite.png", 4, 60, greyed);
}

Work.prototype = new Obstacle();