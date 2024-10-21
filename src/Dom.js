import { Gameboard } from './Gameboard';

export const domUserBoard = document.getElementById('user-board');
export const domComputerBoard = document.getElementById('computer-board');

export class Dom {
	static renderBoard(board, domBoard) {
		while (domBoard.firstChild) {
			domBoard.removeChild(domBoard.firstChild);
		}

		for (let y = 0; y < 10; y++) {
			for (let x = 0; x < 10; x++) {
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
					const ship = board.matrix[y][x];
					const isHit = ship.takenHits.some(
						(hit) => hit[0] === x && hit[1] === y
					);

					if (isHit) {
						const hitSpan = document.createElement('span');
						hitSpan.textContent = 'X';
						hitSpan.className = 'hit';
						cell.appendChild(hitSpan);
					} else {
						const shipSpan = document.createElement('span');
						shipSpan.textContent = 'O';
						shipSpan.className = 'ship';
						cell.appendChild(shipSpan);
					}
				}
			}
		}
	}
}
