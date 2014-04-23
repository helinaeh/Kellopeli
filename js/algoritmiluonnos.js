/*
Ekaa luonnosta oon miettiny siltä pohjalta mitä ollaan puhuttu, ei varmaan kyllä 
saa vielä hirveesti ideaa selville kun on vielö niin kesken...
*/

counter = 0; // +1 aina kun uusi seinämä tehdään
obsProb = 0.1; // todnäk jolla seinään tulee "avattava" este

function Algoritmi(car, hou, gar, wor, watch) { // Parametrit ovat true/false-arvoja sen mukaan onko pelaajalla kyseistä avainta

	this.a = 0; // +1 kun lisätään seinämään este    // Saattaa olla turha, pitää kattoa
	/* 
	Toi alla oleva merkintä on varmaan väärin, onks js:ssä buffereita tai vastaavia??
	Anyway siihen lisätään esteen täyttämät "indeksit" kun se este luodaan (jos esim este
	jonka korkeus on 40 lisätään kohtaan 150, niin se täyttää indeksit 150, 160, 170, 180)
	*/
	this.yBuffer = Buffer();

	addHole;

	addObstacles;

	addWalls;

	count = count + 1;
}

function addHole() {
	
}

function addObstacles() {
	
	if (a < count % 10) { //lisätään auto (ehkä)
		if(/* Random, todennäköisyydellä obsProb */) {
			new Car(!!!/* Random kohta */)
			yBuffer += !!!; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1;
		}
	}

	if (a < count % 20) { //lisätään talo (ehkä)
		if(/* Random, todennäköisyydellä obsProb */) {
			new House(!!!/* Random kohta */)
			yBuffer += !!!; //äsken lisätyn esteen "indeksit" (kts. ylempää)
			a = a + 1;
		}
	}
}

function addWalls() {
	for (h <- 1 to 50) { // käy läpi kentän korkeuden (10 välein)
		if () // jos sillä "indeksillä", ts. siinä kohdassa, ei ole estettä, niin lisää seinän (joka on 10px korkea)
	}
}