function Work(y) {
	Obstacle.call(y, "images/worksprite.png", 4, 60);
}

Work.prototype = new Obstacle();