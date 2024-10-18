import { Ship } from '../src/Ship';

test('When ship gets hit too many times it sinks', () => {
	const ship = new Ship(4);
	ship.hit();
	ship.hit();
	ship.hit();
	ship.hit();
	expect(ship.sunk).toBe(true);
});
