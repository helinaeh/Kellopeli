function Work(x, y, greyed, speed) {
	Obstacle.call(this, x, y, "images/worksprite.png", 4, 140, greyed, speed);
}

Work.prototype = new Obstacle();