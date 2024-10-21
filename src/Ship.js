export class Ship {
	constructor(length) {
		this.takenHits = [];
		this.length = length;
		this.hits = 0;
		this.sunk = false;
	}

	hit(coor) {
		if (!this.isHit(coor)) {
			if (this.hits < this.length) {
				this.hits++;
				this.takenHits.push(coor);
			}
		} else {
			throw new Error('That part of the ship is already hit');
		}

		if (this.isSunk()) this.sunk = true;
	}

	isHit(coor) {
		const isHit = this.takenHits.some(
			(hit) => hit[0] === coor[0] && hit[1] === coor[1]
		);
		return isHit;
	}

	isSunk() {
		return this.hits == this.length;
	}
}
