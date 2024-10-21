import { Dom, board1, board2, startButton } from './Dom';
import { Gameboard } from './Gameboard';
import { Ship } from './Ship';
import { Player } from './Player';
import { LocalStorage } from './LocalStorage';

export class UserInterface {
	static start() {
		document.addEventListener('DOMContentLoaded', () => {
			const player1 = new Gameboard();
			const player2 = new Gameboard();

			Dom.renderBoard(player1, board1);
			Dom.renderBoard(player2, board2);

			const userShip1 = new Ship(3);
			player1.placeShip(userShip1, [0, 0]);
			player1.placeShip(userShip1, [0, 1]);
			player1.placeShip(userShip1, [0, 2]);
			const userShip2 = new Ship(4);
			player1.placeShip(userShip2, [6, 5]);
			player1.placeShip(userShip2, [5, 5]);
			player1.placeShip(userShip2, [4, 5]);
			player1.placeShip(userShip2, [3, 5]);
			const userShip3 = new Ship(2);
			player1.placeShip(userShip3, [8, 2]);
			player1.placeShip(userShip3, [7, 2]);
			Dom.renderBoard(player1, board1);

			const compShip1 = new Ship(3);
			player2.placeShip(compShip1, [0, 0]);
			player2.placeShip(compShip1, [0, 1]);
			player2.placeShip(compShip1, [0, 2]);
			const compShip2 = new Ship(4);
			player2.placeShip(compShip2, [6, 5]);
			player2.placeShip(compShip2, [5, 5]);
			player2.placeShip(compShip2, [4, 5]);
			player2.placeShip(compShip2, [3, 5]);
			const compShip3 = new Ship(2);
			player2.placeShip(compShip3, [8, 2]);
			player2.placeShip(compShip3, [7, 2]);
			Dom.renderBoard(player2, board2);

			startButton.addEventListener('click', () => {
				UserInterface.startGame(player1, player2, board1, board2);
				startButton.disabled = true;
			});
		});
	}

	static startGame(player1, player2, board1, board2) {
		let turn = player1;

		const handleBoardClick = (
			e,
			attackingPlayer,
			defendingPlayer,
			defendingBoard
		) => {
			if (turn == player1 && e.currentTarget == board2) {
				const cell = e.target;
				if (cell.id) {
					const [x, y] = cell.id.split(',').map(Number);
					defendingPlayer.receiveAttack([x, y]);
					Dom.renderBoard(defendingPlayer, defendingBoard);

					if (defendingPlayer.reportIfAllSunk()) {
						alert(
							`${
								attackingPlayer === player1 ? 'You' : 'Computer'
							} wins!`
						);
						board2.removeEventListener(
							'click',
							player1ClickHandler
						);
					} else {
						turn = turn === player1 ? player2 : player1;
						// updateTurnIndicator();
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
						Dom.renderBoard(player1, board1);
						done = true;
					}
				} else {
					if (!player1.inMissedShots(coor)) {
						player1.receiveAttack(coor);
						Dom.renderBoard(player1, board1);
						done = true;
					}
				}
			}
			turn = turn === player1 ? player2 : player1;
			// updateTurnIndicator();
		};

		const player1ClickHandler = (e) =>
			handleBoardClick(e, player1, player2, board2);

		const updateTurnIndicator = () => {
			// board1.classList.toggle('turn', turn === player1);
			// board2.classList.toggle('turn', turn === player2);
		};

		board2.addEventListener('click', player1ClickHandler);

		// updateTurnIndicator();
	}
}
