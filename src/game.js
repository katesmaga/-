const rows = 10;
const cols = 10;
let grid = createGrid(rows, cols);
let previousGrid;

function createGrid(rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols).fill(0);
    }
    return arr;
}

function initializeGrid() {
    const $gameGrid = $("#game-board");
    $gameGrid.empty();
    for (let i = 0; i < rows; i++) {
        let $row = $("<tr></tr>");
        for (let j = 0; j < cols; j++) {
            let $cell = $("<td></td>")
                .attr("id", `${i}-${j}`)
                .addClass("cell dead")
                .on("click", () => toggleCell(i, j));
            $row.append($cell);
        }
        $gameGrid.append($row);
    }
}

function toggleCell(row, col) {
    grid[row][col] = grid[row][col] === 0 ? 1 : 0;
    updateGrid();
}

function updateGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const $cell = $(`#${i}-${j}`);
            if (grid[i][j] === 1) {
                $cell.addClass("alive").removeClass("dead");
            } else {
                $cell.addClass("dead").removeClass("alive");
            }
        }
    }
}

function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += grid[newRow][newCol];
            }
        }
    }
    return count;
}

function nextGeneration() {
    const nextGrid = createGrid(rows, cols);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j] === 1) {
                nextGrid[i][j] = neighbors < 2 || neighbors > 3 ? 0 : 1;
            } else {
                nextGrid[i][j] = neighbors === 3 ? 1 : 0;
            }
        }
    }

    if (gridsAreEqual(grid, nextGrid)) {
        stopGame();
        alert("Гра завершена. Клітинки більше не змінюються!");
    }

    grid = nextGrid.map(arr => [...arr]);
    updateGrid();
}

function gridsAreEqual(grid1, grid2) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid1[i][j] !== grid2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

$(document).ready(function() {
    initializeGrid();
    updateGrid();
});

let gameInterval;
function startGame() {
    if (!gameInterval) {
        gameInterval = setInterval(nextGeneration, 500);
    }
}

function stopGame() {
    clearInterval(gameInterval);
    gameInterval = null;
}
