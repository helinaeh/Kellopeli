function Key(y, id, speed) {
	this.id = id;
	this.x = 900;
	this.y = y;
	this.speed = speed;
}

Key.prototype.move = function(canvas) {
	this.canvas = canvas;
	if (this.x > -35) {
		this.x -= this.speed;
	}
};