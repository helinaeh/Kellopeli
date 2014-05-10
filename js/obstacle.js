function Obstacle(x, y, spriteSrc, type, height, greyed) {
	this.x = x; //este luodaan pelinäkymän ulkopuolelle, kohtaan 900
	this.y = y;
	this.width = 35;
	this.height = height;
	this.spriteSrc = spriteSrc;
	this.type = type;
	this.greyed = greyed;
	this.obsImage = null;
	this.speed = 1;
}

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