function Home(y) {
	Obstacle.call(y, "images/homesprite.png", hom, 40);
}

House.prototype = new Obstacle();