export class UserInterface {
    static start() {
        document.addEventListener('DOMContentLoaded', () => {
            const userBoard = document.getElementById('user-board');
            const computerBoard = document.getElementById('computer-board');
        
            function createBoard(board) {
                for (let i = 0; i < 100; i++) {
                    const cell = document.createElement('div');
                    board.appendChild(cell);
                }
            }
        
            createBoard(userBoard);
            createBoard(computerBoard);
        });
        
    }
}