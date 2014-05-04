/*
Ekaa luonnosta oon miettiny siltä pohjalta mitä ollaan puhuttu, ei varmaan kyllä 
saa vielä hirveesti ideaa selville kun on vielö niin kesken...
*/

counter = 0; // +1 aina kun uusi seinämä tehdään
obsProb = 0.1; // todnäk jolla seinään tulee "avattava" este

function Algoritmi(car, hom, gar, wor, watch) { // Parametrit ovat true/false-arvoja sen mukaan onko pelaajalla kyseistä avainta

	this.a = 0; // +1 kun lisätään seinämään este    // Saattaa olla turha, pitää kattoa
	/* 
	Anyway siihen lisätään esteen täyttämät "indeksit" kun se este luodaan (jos esim este
	jonka korkeus on 200 lisätään kohtaan 150, niin se täyttää indeksit 150, 200, 250, 300)
	*/
	this.yArray = [];

	addHole;

	addObstacles(car, hom, gar, wor, watch);

	addWalls;

	count = count + 1;
}

function addHole() {
	
}

function addObstacles(car, hom, gar, wor, watch) {
	
	if (a < count % 10) { //lisätään auto (ehkä)
		if(Math.random() <= obsProb) {
			var position = 0
			do {
				position = Math.round(Math.random() * 10) *  50
			} while (yArray.indexOf(position) != -1);
			new Car(!!!/* Random kohta */, car)
			yArray += !!!; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1;
		}
	}

	if (a < count % 20) { //lisätään talo (ehkä)
		if(/* Random, todennäköisyydellä obsProb */) {
			new Home(!!!/* Random kohta */, hom)
			yArray += !!!; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1;
		}
	}
}

function addWalls() {
	for (h <- 1 to 10) { // käy läpi kentän korkeuden (50 välein)
		if (yArray.indexOf(h*50) == -1) {

		} // lisää seinän (joka on 10px korkea)
	}
}