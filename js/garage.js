function Garage(y) {
	Obstacle.call(y, "images/garagesprite.png", gar, 40);
}

Garage.prototype = new Obstacle();