export class Ship {
	constructor(length) {
		this.takenHits = [];
		this.length = length;
		this.hits = 0;
		this.sunk = false;
	}

	hit(coor) {
		if (this.hits < this.length) {
			this.hits++;
			this.takenHits.push(coor);
		}
		if (this.isSunk()) this.sunk = true;
	}

	isSunk() {
		return this.hits == this.length;
	}
}
