function Home(x, y, greyed, speed) {
	Obstacle.call(this, x, y, "images/homesprite.png", 3, 105, greyed, speed);
}

Home.prototype = new Obstacle();