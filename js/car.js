function Car(y) {
	Obstacle.call(y, "images/carsprite.png", 1, 20);
}

Car.prototype = new Obstacle();