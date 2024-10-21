import { Dom, board1, board2, startButton } from './Dom';
import { Gameboard } from './Gameboard';
import { Ship } from './Ship';

export class UserInterface {
	static start() {
		document.addEventListener('DOMContentLoaded', () => {
			const player1 = new Gameboard();
			const player2 = new Gameboard();

			Dom.renderBoard(player1, board1, true);
			Dom.renderBoard(player2, board2);

			UserInterface.computerRandomShips(player2, board2);
			UserInterface.setupDragAndDrop(player1, board1);

			startButton.addEventListener('click', () => {
				if (player1.ships.length >= 9) {
					UserInterface.startGame(player1, player2, board1, board2);
					startButton.disabled = true;
				} else {
					alert(
						'Please place all the ships before starting the game!'
					);
				}
			});
		});
	}

	static computerRandomShips(player, board) {
		for (let i = 0; i < 3; i++) {
			if (i == 0) {
				const newShip = new Ship(2);
				const x = Math.floor(Math.random() * 10);
				const y = Math.floor(Math.random() * 10);
				const coor = [x, y];
				let direction = randomDirection();

				if (typeof player.matrix[y][x] !== 'object') {
					player.placeShip(newShip, coor);
					placeAdjacentShip(
						player,
						newShip,
						adjacentOpen(x, y, direction),
						x,
						y
					);
				}
			} else if (i == 1) {
				const newShip = new Ship(3);

				let x = 0;
				let y = 0;
				let coor = [x, y];
				let direction = randomDirection();

				let shipsPlaced = 0;
				while (shipsPlaced < 3) {
					if (shipsPlaced > 0) {
						coor = placeAdjacentShip(
							player,
							newShip,
							adjacentOpen(x, y, direction),
							x,
							y
						);
						x = coor[0];
						y = coor[1];
						shipsPlaced++;
					} else {
						x = Math.floor(Math.random() * 10);
						y = Math.floor(Math.random() * 10);
						coor = [x, y];

						if (typeof player.matrix[y][x] !== 'object') {
							player.placeShip(newShip, coor);
							shipsPlaced++;
						}
					}
				}
			} else if (i == 2) {
				const newShip = new Ship(4);

				let x = 0;
				let y = 0;
				let coor = [x, y];
				let direction = randomDirection();

				let shipsPlaced = 0;
				while (shipsPlaced < 4) {
					if (shipsPlaced > 0) {
						coor = placeAdjacentShip(
							player,
							newShip,
							adjacentOpen(x, y, direction),
							x,
							y
						);
						x = coor[0];
						y = coor[1];
						shipsPlaced++;
					} else {
						x = Math.floor(Math.random() * 10);
						y = Math.floor(Math.random() * 10);
						coor = [x, y];

						if (typeof player.matrix[y][x] !== 'object') {
							player.placeShip(newShip, coor);
							shipsPlaced++;
						}
					}
				}
			}
		}

		function randomDirection() {
			let direction = Math.round(Math.random());
			return direction == 0 ? 'horizontal' : 'vertical';
		}

		function placeAdjacentShip(player, ship, direction, x, y) {
			let newX = x,
				newY = y;
			if (direction == 'up') {
				newY = y + 1;
			} else if (direction == 'down') {
				newY = y - 1;
			} else if (direction == 'right') {
				newX = x + 1;
			} else if (direction == 'left') {
				newX = x - 1;
			}
			player.placeShip(ship, [newX, newY]);
			return [newX, newY];
		}

		function adjacentOpen(x, y, angle = 'vertical') {
			const up = y + 1;
			const down = y - 1;
			const right = x + 1;
			const left = x - 1;

			if (angle == 'vertical') {
				if (typeof player.matrix[up]?.[x] !== 'object' && up < 10) {
					return 'up';
				} else if (
					typeof player.matrix[down]?.[x] !== 'object' &&
					down >= 0
				) {
					return 'down';
				}
			}

			if (angle == 'horizontal') {
				if (
					typeof player.matrix[y]?.[right] !== 'object' &&
					right < 10
				) {
					return 'right';
				} else if (
					typeof player.matrix[y]?.[left] !== 'object' &&
					left >= 0
				) {
					return 'left';
				}
			}
		}

		Dom.renderBoard(player, board);
	}

	static setupDragAndDrop(player, board) {
		const ships = document.querySelectorAll('.shipSelect > div');
		let draggedShip = null;

		ships.forEach((ship) => {
			ship.addEventListener('dragstart', (e) => {
				draggedShip = e.target;
			});
			ship.addEventListener('dragend', () => {
				draggedShip = null;
			});
		});

		board.addEventListener('dragover', (e) => {
			e.preventDefault();
		});

		board.addEventListener('drop', (e) => {
			e.preventDefault();
			if (draggedShip) {
				const cellId = e.target.id.split(',').map(Number);
				const [x, y] = cellId;

				const newShip = new Ship(1);
				player.placeShip(newShip, [x, y]);
				draggedShip.remove();
				Dom.renderBoard(player, board, true);
			} else {
				alert('Cannot place ship here!');
			}
		});
	}

	static startGame(player1, player2, board1, board2) {
		alert('Good Luck!');

		let turn = player1;

		const handleBoardClick = (e, defendingPlayer, defendingBoard) => {
			if (turn == player1 && e.currentTarget == board2) {
				const cell = e.target;
				if (cell.id) {
					const [x, y] = cell.id.split(',').map(Number);
					defendingPlayer.receiveAttack([x, y]);
					Dom.renderBoard(defendingPlayer, defendingBoard);

					if (defendingPlayer.reportIfAllSunk()) {
						alert('You Won!');
						board2.removeEventListener(
							'click',
							player1ClickHandler
						);
					} else {
						turn = turn === player1 ? player2 : player1;
						computerTurn();
					}
				}
			}
		};

		const computerTurn = () => {
			let done = false;
			while (!done) {
				const x = Math.floor(Math.random() * 10);
				const y = Math.floor(Math.random() * 10);
				const coor = [x, y];

				if (typeof player1.matrix[y][x] === 'object') {
					const isHit = player1.matrix[y][x].isHit(coor);
					if (!isHit) {
						player1.receiveAttack(coor);
						Dom.renderBoard(player1, board1, true);
						done = true;
					}
				} else {
					if (!player1.inMissedShots(coor)) {
						player1.receiveAttack(coor);
						Dom.renderBoard(player1, board1, true);
						done = true;
					}
				}
			}

			if (player1.reportIfAllSunk()) {
				alert('Computer Won!');
			} else {
				turn = turn === player1 ? player2 : player1;
			}
		};

		const player1ClickHandler = (e) =>
			handleBoardClick(e, player1, player2, board2);

		board2.addEventListener('click', player1ClickHandler);
	}
}
