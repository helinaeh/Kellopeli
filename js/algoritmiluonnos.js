/*
Ekaa luonnosta oon miettiny siltä pohjalta mitä ollaan puhuttu, ei varmaan kyllä 
saa vielä hirveesti ideaa selville kun on vielö niin kesken...
*/

var counter = 0; // +1 aina kun uusi seinämä tehdään
var obsProb = 0.1; // todnäk jolla seinään tulee "avattava" este
var yArray = [];
var obsArray = [];

function Algoritmi(car, hom, gar, wor, watch) { // Parametrit ovat true/false-arvoja sen mukaan onko pelaajalla kyseistä avainta

	var a = 0; // +1 kun lisätään seinämään este
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
	var position = randomPosition(1);
	yArray += position;
	yArray += position + 1;
};

function addObstacles(car, hom, gar, wor, watch) {

	position = 0;

	for (i = 0; i < count % 40; i++) { //lisätään työpaikka (ehkä)
		if(Math.random() <= obsProb * 0.4) {
			position = randomPosition(4);
			obsArray += new Home(position, wor || watch);
			yArray += position; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1; // turha??
		};
	}

	for (i = 0; i < count % 30; i++) { //lisätään koti (ehkä)
		if(Math.random() <= obsProb * 0.6) {
			position = randomPosition(3);
			obsArray += new Home(position, hom || watch);
			yArray += position; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1; // turha??
		};
	}

	for (i = 0; i < count % 20; i++) { //lisätään autotalli (ehkä)
		if(Math.random() <= obsProb * 0.8) {
			position = randomPosition(2);
			obsArray += new Garage(position, gar || watch);
			yArray += position; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1; // turha??
		};
	}

	for (i = 0; i < count % 10; i++) { //lisätään auto (ehkä)
		if(Math.random() <= obsProb) {
			var position = randomPosition(1);
			obsArray += new Car(position, car || watch);
			yArray += position; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1; // turha??
		};
	}
};

function addWalls() {
	for (h = 0; h < 10; h++) { // käy läpi indeksit
		if (yArray.indexOf(h) == -1) {
			obsArray += new Wall(h*50);
		}; // lisää seinän (joka on 50px korkea)
	}
};

function randomPosition(height) {
	var result = 0;
	do {
		result = Math.round(Math.random() * 10);
	} while (!isEmpty(result, height));
	result;
};

function isEmpty(result, height) {
	var res = false;
	for (i = result; i < result + height; i++) {
		if (yArray.indexOf(i) != -1) res = true;
	};
	res;
};






