function Player(x, y) {
	this.x = x;
	this.y = y;
	this.speed = 2;
	this.spriteSrc = "images/playersprite.png"; //create!
	this.width = 22; //määrittele spritesheetin perusteella!!!
	this.height = 28;
	this.characterImage = null;
}

Player.prototype.getImage = function(path) {
	this.path = path;
	var characterReady = false;
	characterImage = new Image();
	characterImage.onload = function () { //???????
		characterReady = true;
	};
	characterImage.src = path;
	return characterImage;
};