import { Ship } from './Ship';

export class Gameboard {
	constructor() {
		this.matrix = [];
		this.missedShots = [];
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
				this.matrix[y][x].hit();
			} else {
				this.missedShots.push([x, y]);
			}
		} else {
			throw new Error('Attack is out of bounds');
		}
	}
}
