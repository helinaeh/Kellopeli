function House(y) {
	Obstacle.call(y, "images/housesprite.png", hou, 40);
}

House.prototype = new Obstacle();