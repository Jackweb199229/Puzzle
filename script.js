// script.js
const gameBoard = document.getElementById('game-board');
const shuffleButton = document.getElementById('shuffle-button');
let tiles = [];

// Initialize the game
function init() {
    for (let i = 1; i <= 15; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.innerText = i;
        tile.addEventListener('click', () => moveTile(i));
        tiles.push(tile);
        gameBoard.appendChild(tile);
    }
    const emptyTile = document.createElement('div');
    emptyTile.classList.add('tile');
    emptyTile.classList.add('empty');
    tiles.push(emptyTile);
    gameBoard.appendChild(emptyTile);
    shuffle();
}

// Move a tile
function moveTile(number) {
    const tileIndex = tiles.findIndex(tile => tile.innerText == number);
    const emptyIndex = tiles.findIndex(tile => tile.classList.contains('empty'));

    const [tileRow, tileCol] = [Math.floor(tileIndex / 4), tileIndex % 4];
    const [emptyRow, emptyCol] = [Math.floor(emptyIndex / 4), emptyIndex % 4];

    if ((Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol)) === 1) {
        [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]];
        render();
    }
}

// Shuffle the tiles
function shuffle() {
    for (let i = 0; i < 1000; i++) {
        const movableTiles = [];
        const emptyIndex = tiles.findIndex(tile => tile.classList.contains('empty'));
        const [emptyRow, emptyCol] = [Math.floor(emptyIndex / 4), emptyIndex % 4];

        if (emptyRow > 0) movableTiles.push(tiles[emptyIndex - 4]);
        if (emptyRow < 3) movableTiles.push(tiles[emptyIndex + 4]);
        if (emptyCol > 0) movableTiles.push(tiles[emptyIndex - 1]);
        if (emptyCol < 3) movableTiles.push(tiles[emptyIndex + 1]);

        const randomTile = movableTiles[Math.floor(Math.random() * movableTiles.length)];
        moveTile(randomTile.innerText);
    }
}

// Render the tiles
function render() {
    gameBoard.innerHTML = '';
    tiles.forEach(tile => gameBoard.appendChild(tile));
}

// Event listeners
shuffleButton.addEventListener('click', shuffle);

// Initialize the game on page load
init();
