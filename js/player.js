function Player(x, y) {
	this.x = x;
	this.y = y;
	this.speed = 1;
	this.spriteSrc = "images/playersprite.png"; //create!
	this.width = 0; //määrittele spritesheetin perusteella!!!
	this.height = 0;
	this.characterImage = null;
}

Player.prototype.getImage() {
	this.path = path;
	var characterReady = false;
	characterImage = new Image();
	characterImage.onload = function () { //???????
		characterReady = true;
	};
	characterImage.src = path;
	return characterImage;	
};