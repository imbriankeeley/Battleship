import { Gameboard } from './Gameboard';

export const domUserBoard = document.getElementById('user-board');
export const domComputerBoard = document.getElementById('computer-board');

export class Dom {
	static renderBoard(board, domBoard) {
		while (domBoard.firstChild) {
			domBoard.removeChild(domBoard.firstChild);
		}

		for (let i = 0; i < 10; i++) {
			let y = i;
			for (let j = 0; j < 10; j++) {
				let x = j;

				const cell = document.createElement('div');
				cell.className = 'cell';
				const hit = document.createElement('p');
				hit.textContent = 'X';
				hit.className = 'hit';
				const ship = document.createElement('p');
				ship.textContent = 'O';
				ship.className = 'ship';
				domBoard.appendChild(cell);

				if (typeof board.matrix[y][x] === 'object') {
					board.matrix[y][x].hit == true
						? cell.append(hit)
						: cell.append(ship);
				}
			}
		}
	}
}
