function Home(y, greyed) {
	Obstacle.call(y, "images/homesprite.png", 3, 150, greyed);
}

House.prototype = new Obstacle();