function Car(y) {
	Obstacle.call(y, "images/carsprite.png", car, 20);
}

Car.prototype = new Obstacle();