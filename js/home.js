function Home(y, greyed) {
	Obstacle.call(this, y, "images/homesprite.png", 3, 105, greyed);
}

Home.prototype = new Obstacle();