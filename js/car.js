function Car(x, y, greyed) {
	Obstacle.call(this, x, y, "images/carsprite.png", 1, 35, greyed);
}

Car.prototype = new Obstacle();