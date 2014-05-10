function Work(x, y, greyed) {
	Obstacle.call(this, x, y, "images/worksprite.png", 4, 140, greyed);
}

Work.prototype = new Obstacle();