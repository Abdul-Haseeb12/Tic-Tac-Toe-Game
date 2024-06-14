document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !isGameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            isGameActive = false;
            setTimeout(() => alert(`${currentPlayer} wins!`), 10);
        } else if (board.every(cell => cell !== '')) {
            isGameActive = false;
            setTimeout(() => alert('It\'s a draw!'), 10);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
