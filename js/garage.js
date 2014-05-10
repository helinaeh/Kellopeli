function Garage(x, y, greyed, speed) {
	Obstacle.call(this, x, y, "images/garagesprite.png", 2, 70, greyed, speed);
}

Garage.prototype = new Obstacle();