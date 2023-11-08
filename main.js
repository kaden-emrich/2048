const gameDiv = document.getElementById('game');

var squares = [[]];
var values = [];

function initGrid() {
    gameDiv.innerHTML = '';
    squares = [[]];
    values = [];

    for(let i = 0; i < 4; i++) {
        squares[i] = [];
        values[i] = [];

        for(let j = 0; j < 4; j++) {
            values[i][j] = 0;

            squares[i][j] = document.createElement('div');
            squares[i][j].classList.add('gridSquare');

            gameDiv.appendChild(squares[i][j]);
        }
    }
}

function updateSquares() {
    for(let i = 0; i < values.length; i++) {
        for(let j = 0; j < values[i].length; j++) {
            if(values[i][j] != 0) {
                squares[i][j].innerText = values[i][j];
            }
            else {
                squares[i][j].innerText = '';
            }
        }
    }
}

function spawnSquares() {
    let row = Math.floor(Math.random() * 4);
    let column = Math.floor(Math.random() * 4);

    while(values[row][column] != 0) {
        row = Math.floor(Math.random() * 4);
        column = Math.floor(Math.random() * 4);
    }

    values[row][column] = 2;
}

function moveUp() {
    for(let n = 0; n < 4; n++) {
        for(let i = 1; i < values.length; i++) {
            for(let j = 0; j < values[i].length; j++) {
                if(values[i - 1][j] == values[i][j]) {
                    values[i - 1][j] = values[i][j] * 2;
                    values[i][j] = 0;
                }
                else if(values[i - 1][j] == 0) {
                    values[i - 1][j] = values[i][j];
                    values[i][j] = 0;
                }
            }
        }
    }
    updateSquares();
}

function moveDown() {
    for(let n = 0; n < 4; n++) {
        for(let i = 2; i >= 0; i--) {
            for(let j = 0; j < values[i].length; j++) {
                if(values[i + 1][j] == values[i][j]) {
                    values[i + 1][j] = values[i][j] * 2;
                    values[i][j] = 0;
                }
                else if(values[i + 1][j] == 0) {
                    values[i + 1][j] = values[i][j];
                    values[i][j] = 0;
                }
            }
        }
    }
    updateSquares();
}

function moveLeft() {
    for(let n = 0; n < 4; n++) {
        for(let j = 1; j < values[0].length; j++) {
            for(let i = 0; i < values.length; i++) {
                if(values[i][j - 1] == values[i][j]) {
                    values[i][j - 1] = values[i][j] * 2;
                    values[i][j] = 0;
                }
                else if(values[i][j - 1] == 0) {
                    values[i][j - 1] = values[i][j];
                    values[i][j] = 0;
                }
            }
        }
    }
    updateSquares();
}

function moveRight() {
    for(let n = 0; n < 4; n++) {
        for(let j = 2; j >= 0; j--) {
            for(let i = 0; i < values.length; i++) {
                if(values[i][j + 1] == values[i][j]) {
                    values[i][j + 1] = values[i][j] * 2;
                    values[i][j] = 0;
                }
                else if(values[i][j + 1] == 0) {
                    values[i][j + 1] = values[i][j];
                    values[i][j] = 0;
                }
            }
        }
    }
    updateSquares();
}

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            moveUp();
            spawnSquares();
            break;
        case 'ArrowDown':
            moveDown();
            spawnSquares();
            break;
        case 'ArrowLeft':
            moveLeft();
            spawnSquares();
            break;
        case 'ArrowRight':
            moveRight();
            spawnSquares();
            break;
    }
});

function init() {
    initGrid();
}

init();

function test1() {
    values[0][0] = 2;
    updateSquares();
}

test1();