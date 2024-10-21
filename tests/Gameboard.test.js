import { Gameboard } from '../src/Gameboard';
import { Ship } from '../src/Ship';

test('In bounds ship is placed on board', () => {
	const gameboard = new Gameboard();
	const ship = new Ship(1);
	gameboard.placeShip(ship, [2, 3]);
	expect(gameboard.matrix[3][2]).toBe(ship);
});

test('Out of bounds ship throws an error', () => {
	const gameboard = new Gameboard();
	const ship = new Ship(1);

	expect(function () {
		gameboard.placeShip(ship, [2, 11]);
	}).toThrow(
		new Error(`Ship cannot be placed on [2, 11]. It is out of bounds.`)
	);
});

test('When ship is hit send hit function', () => {
	const gameboard = new Gameboard();
	const ship = new Ship(1);
	gameboard.placeShip(ship, [5, 6]);
	gameboard.receiveAttack([5, 6]);
	expect(ship.hits).toBe(1);
});

test('When attack misses a ship record the coordinates', () => {
	const gameboard = new Gameboard();
	const ship = new Ship(1);
	gameboard.placeShip(ship, [6, 9]);
	gameboard.receiveAttack([9, 6]);
	expect(gameboard.missedShots[0]).toStrictEqual([9, 6]);
});

test('Send error if attack is out of bounds', () => {
	const gameboard = new Gameboard();
	const ship = new Ship(1);
	gameboard.placeShip(ship, [6, 9]);
	expect(() => {
		gameboard
			.receiveAttack([11, 11])
			.toThrow(new Error('Attack is out of bounds'));
	});
});

test('Return true because all ships are sunk', () => {
	const gameboard = new Gameboard();
	const ship = new Ship(1);
	gameboard.placeShip(ship, [4, 2]);
	gameboard.receiveAttack([4, 2]);
	expect(gameboard.reportIfAllSunk()).toBe(true);
});

test('Return false because all ships are not sunk', () => {
	const gameboard = new Gameboard();
	const ship = new Ship(1);
	const ship2 = new Ship(2);
	gameboard.placeShip(ship, [4, 2]);
	gameboard.placeShip(ship2, [6, 9]);
	gameboard.receiveAttack([4, 2]);
	expect(gameboard.reportIfAllSunk()).toBe(false);
});

test('When ship part has already been hit throw an error', () => {
	const gameboard = new Gameboard();
	const ship = new Ship(1);
	gameboard.placeShip(ship, [4, 2]);
	gameboard.receiveAttack([4, 2]);
	expect(() => {
		gameboard.receiveAttack([4, 2]);
	}).toThrow(new Error('That part of the ship is already hit'));
});
