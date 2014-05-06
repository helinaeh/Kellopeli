function Garage(y, greyed) {
	Obstacle.call(this, y, "images/garagesprite.png", 2, 100, greyed);
}

Garage.prototype = new Obstacle();