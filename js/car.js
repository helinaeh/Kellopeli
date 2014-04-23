function Car(y) {
	Obstacle.call(y, "images/carsprite.png");
}

Car.prototype = new Obstacle();