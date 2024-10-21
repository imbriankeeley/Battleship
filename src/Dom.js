import { Gameboard } from './Gameboard';

export const board1 = document.getElementById('user-board');
export const board2 = document.getElementById('computer-board');
export const startButton = document.getElementById('start-game');

export class Dom {
	static renderBoard(player, board, ships) {
		while (board.firstChild) {
			board.removeChild(board.firstChild);
		}

		for (let y = 0; y < 10; y++) {
			for (let x = 0; x < 10; x++) {
				const cell = document.createElement('div');
				cell.id = `${x},${y}`;
				cell.className = 'cell';
				board.appendChild(cell);

				if (typeof player.matrix[y][x] === 'object') {
					const ship = player.matrix[y][x];
					const isHit = ship.takenHits.some(
						(hit) => hit[0] === x && hit[1] === y
					);

					if (isHit) {
						const hitSpan = document.createElement('span');
						const hitIcon = document.createElement('i');
						hitIcon.classList.add('fa-solid');
						hitIcon.classList.add('fa-explosion');
						hitSpan.classList.add('hit');
						hitSpan.append(hitIcon);
						cell.appendChild(hitSpan);
					} else if (ships == true) {
						const shipSpan = document.createElement('span');
						const shipIcon = document.createElement('i');
						shipIcon.classList.add('fa-solid');
						shipIcon.classList.add('fa-ship');
						shipSpan.classList.add('ship');
						shipSpan.append(shipIcon);
						cell.appendChild(shipSpan);
					}
				} else {
					if (player.inMissedShots([x, y])) {
						const missSpan = document.createElement('span');
						const missIcon = document.createElement('i');
						missIcon.classList.add('fa-solid');
						missIcon.classList.add('fa-x');
						missSpan.classList.add('miss');
						missSpan.appendChild(missIcon);
						cell.appendChild(missSpan);
					}
				}
			}
		}
	}
}
