function Work(y) {
	Obstacle.call(y, "images/worksprite.png", wor, 60);
}

Work.prototype = new Obstacle();