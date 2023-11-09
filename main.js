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

                if(values[i][j] <= 8192) {
                    squares[i][j].classList = 'gridSquare x' + values[i][j];
                }
                else {
                    squares[i][j].classList = 'gridSquare x8192';
                }
            }
            else {
                squares[i][j].innerText = '';
                squares[i][j].classList = 'gridSquare';
            }
        }
    }
}

function hasEmptyValues() {
    for(let i = 0; i < values.length; i++) {
        for(let j = 0; j < values[i].length; j++) {
            if(values[i][j] == 0) {
                return true;
            }
        }
    }
    return false;
}

function compareValues(otherValues) {
    for(let i = 0; i < values.length; i++) {
        for(let j = 0; j < values[i].length; j++) {
            if(values[i][j] != otherValues[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function spawnSquares() {
    if(!hasEmptyValues()) {
        return;
    }

    let row = Math.floor(Math.random() * 4);
    let column = Math.floor(Math.random() * 4);

    while(values[row][column] != 0) {
        row = Math.floor(Math.random() * 4);
        column = Math.floor(Math.random() * 4);
    }

    values[row][column] = 2;

    updateSquares();
}

function getColumn(array, columnIndex) {
    let column = [];

    for(let i = 0; i < array.length; i++) {
        column.push(array[i][columnIndex]);
    }

    return column;
}

function flip(array) {
    let newArray = [[]];

    for(let i = 0; i < array[0].length; i++) {
        newArray[i] = getColumn(array, i);
    }

    return newArray;
}

function reverse(array) {
    let newArray = [];

    for(let i = array.length - 1; i >= 0; i--) {
        newArray.push(array[i]);
    }

    return newArray;
}

function trimZeros(array) {
    let newArray = [];

    for(let i = 0; i < array.length; i++) {
        if(array[i] != 0) {
            newArray.push(array[i]);
        }
    }

    return newArray;
}

function fillZeros(array) {
    while(array.length < 4) {
        array.push(0);
    }

    return array;
}

function slide(array) {
    array = trimZeros(array);

    for(let i = 0; i < array.length - 1; i++) {
        if(array[i] == array[i+1]) {
            array[i] *= 2;
            array[i+1] = 0;
        }
    }

    array = trimZeros(array);

    return fillZeros(array);
}

function moveLeft() {
    for(let i = 0; i < values.length; i++) {
        values[i] = slide(values[i]);
    }
    
    updateSquares();
}

function moveRight() {
    for(let i = 0; i < values.length; i++) {
        values[i] = reverse(slide(reverse(values[i])));
    }
    
    updateSquares();
}

function moveUp() {
    let flipedValues = flip(values);

    for(let i = 0; i < flipedValues[0].length; i++) {
        flipedValues[i] = slide(flipedValues[i]);
    }

    values = flip(flipedValues);

    updateSquares();
}

function moveDown() {
    let flipedValues = flip(values);

    for(let i = 0; i < flipedValues[0].length; i++) {
        flipedValues[i] = reverse(slide(reverse(flipedValues[i])));
    }

    values = flip(flipedValues);

    updateSquares();
}

var testVar1 = 0;

document.addEventListener('keyup', (event) => {
    let lastValues = JSON.stringify(values);

    switch(event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }

    if(!compareValues(JSON.parse(lastValues))) {
        console.log('spawning squares' + testVar1);
        testVar1 ++;
        spawnSquares();
    }
});

function init() {
    initGrid();

    spawnSquares();
    spawnSquares();
}

init();

function test1() {
    values = [
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [4, 4, 8, 8],
        [4, 4, 8, 8]
    ]
    updateSquares();
}
