function Car(x, y, greyed, speed) {
	Obstacle.call(this, x, y, "images/carsprite.png", 1, 35, greyed, speed);
}

Car.prototype = new Obstacle();