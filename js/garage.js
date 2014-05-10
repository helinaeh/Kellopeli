function Garage(x, y, greyed) {
	Obstacle.call(this, x, y, "images/garagesprite.png", 2, 70, greyed);
}

Garage.prototype = new Obstacle();