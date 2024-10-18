export class Ship {
	constructor(length) {
		this.length = length;
		this.hits = 0;
		this.sunk = false;
	}

	hit() {
		if (this.hits < this.length) this.hits++;
		if (this.isSunk()) this.sunk = true;
	}

	isSunk() {
		return this.hits == this.length;
	}
}
