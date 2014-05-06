/*
Ekaa luonnosta oon miettiny siltä pohjalta mitä ollaan puhuttu, ei varmaan kyllä 
saa vielä hirveesti ideaa selville kun on vielö niin kesken...
*/

var count = 0; // +1 aina kun uusi seinämä tehdään
var obsProp = 0.1; // todnäk jolla seinään tulee "avattava" este
var yArray = [];
var obsArray = [];
var a = 0;

function createObstacleWall(car, hom, gar, wor, watch) { // Parametrit ovat true/false-arvoja sen mukaan onko pelaajalla kyseistä avainta

	a = 0; // +1 kun lisätään seinämään este
	/* 
	Anyway siihen lisätään esteen täyttämät "indeksit" kun se este luodaan (jos esim este
	jonka korkeus on 140 lisätään kohtaan 105, niin se täyttää indeksit 105/35=3, 140/35=4,
	175/35=5, 210/35=6)
	*/
	yArray = [];

	addHole();

	addObstacles(car, hom, gar, wor, watch);

	addWalls();

	count = count + 1;
}

function addHole() {
	var position = Math.round(Math.random() * 12);
	var holeSize = 3;
	var x = 0;
	if (count > 80 && Math.random() < 0.03) return;
	do {
		yArray.push(position);
		position = position + 1;
		x = x + 1;
	} while (x < holeSize - Math.round(Math.random() - 0.4) - (count % 25));
}

function addObstacles(car, hom, gar, wor, watch) {

	var position = 0;

	for (var i = 0; i < count % 40; i++) { //lisätään työpaikka (ehkä)
		if(Math.random() <= obsProp * 0.4) {
			position = randomPosition(4);
			if (position != -1) {
				obsArray.push(new Work(position, wor || watch));
				yArray.push(position, position+1, position+2, position+3); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}

	for (i = 0; i < count % 30; i++) { //lisätään koti (ehkä)
		if(Math.random() <= obsProp * 0.6) {
			position = randomPosition(3);
			if (position != -1) {
				obsArray += new Home(position, hom || watch);
				yArray.push(position, position+1, position+2); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}

	for (i = 0; i < count % 20; i++) { //lisätään autotalli (ehkä)
		if(Math.random() <= obsProp * 0.8) {
			position = randomPosition(2);
			if (position != -1) {
				obsArray += new Garage(position, gar || watch);
				yArray.push(position, position+1); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}

	for (i = 0; i < count % 10; i++) { //lisätään auto (ehkä)
		if(Math.random() <= obsProp) {
			position = randomPosition(1);
			if (position != -1) {
				obsArray += new Car(position, car || watch);
				yArray.push(position); //äsken lisätyn esteen "indeksit" (kts. ylempää)
				a = a + 1; // turha??
			}
		}
	}
}

function addWalls() {
	for (var h = 0; h < 10; h++) { // käy läpi indeksit
		if (yArray.indexOf(h) == -1) {
			obsArray += new Wall(h*35);
		} // lisää seinän (joka on 35px korkea)
	}
}

function randomPosition(height) {
	var result = -1;
	/*
	ensimmäinen versio, tämä olisi jatkanut paikan arpomista loputtomiin jos tarpeeksi isoa paikkaa ei ole
	do {
		result = Math.round(Math.random() * 10);
	} while (!isEmpty(result, height));
	*/
	for (var i = 0; i < 10; i++) {
		result = Math.round(Math.random() * 15);
		if (isEmpty(result, height)) {
			break;
		} else result = -1;
	}

	return result;
}

function isEmpty(result, height) {
	var res = false;
	for (var i = result; i < result + height; i++) {
		if (yArray.indexOf(i) != -1) res = true;
	}
	return res;
}






