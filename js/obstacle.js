function Obstacle(y, spriteSrc, type, height, greyed) {
	this.x = 900; //este luodaan pelinäkymän ulkopuolelle
	this.y = y;
	this.width = 20;
	this.height = height;
	this.spriteSrc = spriteSrc;
	this.type = type;
	this.greyed = greyed;
	this.obsImage = null;
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

/*
Esteen ominaisuuksia:
- key eli minkälainen este on kyseessä (auto, talo, työpaikka, autotalli)
- kyseinen key on sama aina oikeanlaisella avaimella
- esteen koko (leveys vakio, mutta korkeus määräytyy keyn mukaan)
- ALILUOKKIA (car jo luotu!)
*/