function Home(y) {
	Obstacle.call(y, "images/homesprite.png", 3, 40);
}

House.prototype = new Obstacle();