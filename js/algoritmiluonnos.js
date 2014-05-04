/*
Ekaa luonnosta oon miettiny siltä pohjalta mitä ollaan puhuttu, ei varmaan kyllä 
saa vielä hirveesti ideaa selville kun on vielö niin kesken...
*/

var counter = 0; // +1 aina kun uusi seinämä tehdään
var obsProb = 0.1; // todnäk jolla seinään tulee "avattava" este
var yArray = [];

function Algoritmi(car, hom, gar, wor, watch) { // Parametrit ovat true/false-arvoja sen mukaan onko pelaajalla kyseistä avainta

	var a = 0; // +1 kun lisätään seinämään este    // Ei ole turha, pitää palauttaa lopuksi !!
	/* 
	Anyway siihen lisätään esteen täyttämät "indeksit" kun se este luodaan (jos esim este
	jonka korkeus on 200 lisätään kohtaan 150, niin se täyttää indeksit 150/50=3, 200/50=4,
	 250/50=5, 300/50=6)
	*/
	yArray = [];

	addHole;

	addObstacles(car, hom, gar, wor, watch);

	addWalls;

	count = count + 1;
};

function addHole() {
	
};

function addObstacles(car, hom, gar, wor, watch) {

	for (i = 0; i < count % 40; i++) { //lisätään työpaikka (ehkä)
		if(Math.random() <= obsProb * 0.4) {
			new Home(randomPosition(4), wor || watch);
			yArray += !!!; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1; // turha??
		}
	}

	for (i = 0; i < count % 30; i++) { //lisätään koti (ehkä)
		if(Math.random() <= obsProb * 0.6) {
			new Home(randomPosition(3), hom || watch);
			yArray += !!!; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1; // turha??
		}
	}

	for (i = 0; i < count % 20; i++) { //lisätään autotalli (ehkä)
		if(Math.random() <= obsProb * 0.8) {
			new Garage(randomPosition(2), gar || watch);
			yArray += !!!; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1; // turha??
		}
	}

	for (i = 0; i < count % 10; i++) { //lisätään auto (ehkä)
		if(Math.random() <= obsProb) {
			var position = randomPosition(1);
			new Car(position, car || watch);
			yArray += position; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1; // turha??
		}
	}
};

function addWalls() {
	for (h = 0; h < 10; h++) { // käy läpi indeksit
		if (yArray.indexOf(h) == -1) {
			new Wall(h*50)
		} // lisää seinän (joka on 50px korkea)
	}
};

function randomPosition(height) {
	var result = 0;
	do {
		result = Math.round(Math.random() * 10)
	} while (!Empty(result, height));
};

function Empty(result, height) {
	var res = false;
	for (i = result; i < result + height; i++) {
		if (yArray.indexOf(i) != -1) res = true
	}
	res
};






