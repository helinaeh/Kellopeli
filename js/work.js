function Work(y, greyed) {
	Obstacle.call(this, y, "images/worksprite.png", 4, 140, greyed);
}

Work.prototype = new Obstacle();