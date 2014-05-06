function Obstacle(y, spriteSrc, type, height, greyed) {
	this.x = 800; //este luodaan pelinäkymän ulkopuolelle, kohtaan 900
	this.y = y;
	this.width = 35;
	this.height = height;
	this.spriteSrc = spriteSrc;
	this.type = type;
	this.greyed = greyed;
	this.obsImage = null;
	this.speed = 1;
}

Obstacle.prototype.getImage = function() {
	var characterReady = false;
	obsImage = new Image();
	obsImage.onload = function () {
		characterReady = true;
	};
	obsImage.src = this.spriteSrc;
	console.log(this.spriteSrc);
	return obsImage;
};

Obstacle.prototype.move = function(canvas) {
	this.canvas = canvas;
	if (this.x > -35) {
		this.x -= this.speed;
	}
};

/*
Esteen ominaisuuksia:
- key eli minkälainen este on kyseessä (auto, talo, työpaikka, autotalli)
- kyseinen key on sama aina oikeanlaisella avaimella
- esteen koko (leveys vakio, mutta korkeus määräytyy keyn mukaan)
- ALILUOKKIA (car jo luotu!)
*/