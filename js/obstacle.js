function Obstacle(y, spriteSrc) {
	this.x = 888; //este luodaan pelinäkymän ulkopuolelle
	this.y = y;
	this.spriteSrc = spriteSrc;
}

/*
Esteen ominaisuuksia:
- key eli minkälainen este on kyseessä (auto, talo, työpaikka, autotalli)
- kyseinen key on sama aina oikeanlaisella avaimella
- esteen koko (leveys vakio, mutta korkeus määräytyy keyn mukaan)
- ALILUOKKIA (car jo luotu!)
*/