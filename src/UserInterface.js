import { Dom, domUserBoard, domComputerBoard } from './Dom';
import { Gameboard } from './Gameboard';
import { Ship } from './Ship';
import { Player } from './Player';
import { LocalStorage } from './LocalStorage';

export class UserInterface {
	static start() {
		document.addEventListener('DOMContentLoaded', () => {
			const userGameboard = new Gameboard();
			const computerGameboard = new Gameboard();

			Dom.renderBoard(userGameboard, domUserBoard);
			Dom.renderBoard(computerGameboard, domComputerBoard);

			const userShip1 = new Ship(3);
			userGameboard.placeShip(userShip1, [0, 0]);
			userGameboard.placeShip(userShip1, [0, 1]);
			userGameboard.placeShip(userShip1, [0, 2]);
			userGameboard.receiveAttack([0, 1]);
			Dom.renderBoard(userGameboard, domUserBoard);
			userGameboard.receiveAttack([0, 1]);
			Dom.renderBoard(userGameboard, domUserBoard);
		});
	}
}
