function Garage(y, greyed) {
	Obstacle.call(y, "images/garagesprite.png", 2, 40, greyed);
}

Garage.prototype = new Obstacle();