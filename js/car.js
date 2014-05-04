function Car(y, greyed) {
	Obstacle.call(y, "images/carsprite.png", 1, 20, greyed);
}

Car.prototype = new Obstacle();