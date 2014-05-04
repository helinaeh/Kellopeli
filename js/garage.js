function Garage(y) {
	Obstacle.call(y, "images/garagesprite.png", 2, 40);
}

Garage.prototype = new Obstacle();