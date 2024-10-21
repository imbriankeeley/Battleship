export class Gameboard {
	constructor() {
		this.matrix = [];
		this.missedShots = [];
		this.ships = [];
		for (let i = 0; i < 10; i++) {
			let row = [];
			for (let j = 0; j < 10; j++) {
				row.push(j);
			}
			this.matrix.push(row);
		}
	}

	inBound(column, row) {
		return column < 10 && column >= 0 && row < 10 && row >= 0;
	}

	placeShip(ship, coor) {
		let x = coor[0];
		let y = coor[1];
		if (this.inBound(x, y)) {
			this.matrix[y][x] = ship;
			this.ships.push(ship);
		} else {
			throw new Error(
				`Ship cannot be placed on [${x}, ${y}]. It is out of bounds.`
			);
		}
	}

	receiveAttack(coor) {
		let x = coor[0];
		let y = coor[1];
		if (this.inBound(x, y)) {
			if (typeof this.matrix[y][x] === 'object') {
				this.matrix[y][x].hit([x, y]);
			} else {
				this.missedShots.push([x, y]);
			}
		} else {
			throw new Error('Attack is out of bounds');
		}
	}

	inMissedShots(coor) {
		const isIn = this.missedShots.some(
			(miss) => miss[0] === coor[0] && miss[1] === coor[1]
		);
		return isIn;
	}

	reportIfAllSunk() {
		let allShips = this.ships.length;
		let shipsSunk = 0;
		this.ships.forEach((ship) => {
			if (ship.isSunk()) shipsSunk++;
		});
		return shipsSunk == allShips ? true : false;
	}
}
