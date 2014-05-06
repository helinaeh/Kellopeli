function Car(y, greyed) {
	Obstacle.call(this, y, "images/carsprite.png", 1, 35, greyed);
}

Car.prototype = new Obstacle();