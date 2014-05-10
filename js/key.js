function Key(y, id) {
	this.id = id;
	this.x = 900;
	this.y = y;
	this.speed = 1;
}

Key.prototype.move = function(canvas) {
	this.canvas = canvas;
	if (this.x > -35) {
		this.x -= this.speed;
	}
};