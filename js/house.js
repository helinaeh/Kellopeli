function Home(y, greyed) {
	Obstacle.call(this, y, "images/homesprite.png", 3, 150, greyed);
}

House.prototype = new Obstacle();