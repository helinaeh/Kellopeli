function Home(x, y, greyed) {
	Obstacle.call(this, x, y, "images/homesprite.png", 3, 105, greyed);
}

Home.prototype = new Obstacle();