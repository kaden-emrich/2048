const gameDiv = document.getElementById('game');

var squares = [[]];
var values = [];

const animationTime = 100;

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

function createTempSquares() {
    let oldSquares = [[], [], [], []];
    for(let i = 0; i < squares.length; i++) {
        for(let j = 0; j < squares[i].length; j++) {
            if(squares[i][j].classList.length > 1) {
                let nextSquare = document.createElement('div');
                nextSquare.classList = squares[i][j].classList;
                nextSquare.classList.add('animation-square');
                nextSquare.style = "position: fixed;";
                nextSquare.style.top = squares[i][j].offsetTop + 'px';
                nextSquare.style.left = squares[i][j].offsetLeft + 'px';
                nextSquare.style.width = squares[i][j].offsetWidth + 'px';
                nextSquare.style.height = squares[i][j].offsetHeight + 'px';
                nextSquare.innerText = squares[i][j].innerText;
                gameDiv.appendChild(nextSquare);

                oldSquares[i][j] = nextSquare;
            }
            else {
                oldSquares[i][j] = null;
            }
        }
    }
    return oldSquares;
}

function clearTempSquares(oldSquares) {
    for(let i = 0; i < oldSquares.length; i++) {
        for(let j = 0; j < oldSquares[i].length; j++) {
            if(oldSquares[i][j] != null) {
                oldSquares[i][j].remove();
            }
        }
    }
}

function updateSquares(animation = "none") {
    if(animation == 'left') {
        let oldSquares = createTempSquares();

        for(let i = 0; i < squares.length; i++) {
            for(let j = 0; j < squares[i].length; j++) {
                squares[i][j].innerText = '';
                squares[i][j].className = 'gridSquare';
            }
        }

        for(let i = 0; i < oldSquares.length; i++) {
            let offset = 0;
            let lastWasMurge = false;
            for(let j = 0; j < oldSquares[i].length; j++) {
                if(oldSquares[i][j]) {
                    oldSquares[i][j].style.left = squares[i][offset].offsetLeft + "px";

                    let doMurge = false;
                    if(!lastWasMurge) {
                        for(let n = j + 1; n < oldSquares[i].length; n++) {
                            if(oldSquares[i][n]) {
                                if(oldSquares[i][n].innerText == oldSquares[i][j].innerText) {
                                    doMurge = true;
                                    lastWasMurge = true;
                                }
                                n = 1000;
                            }
                        }
                    }
                    else {
                        lastWasMurge = false;
                    }
                    
                    offset += doMurge ? 0 : 1;
                }
            }
        }

        setTimeout(() => {
            updateSquares();

            clearTempSquares(oldSquares);
        }, animationTime);
    }
    else if(animation == 'right') {
        let oldSquares = createTempSquares();

        for(let i = 0; i < squares.length; i++) {
            for(let j = 0; j < squares[i].length; j++) {
                squares[i][j].innerText = '';
                squares[i][j].className = 'gridSquare';
            }
        }

        for(let i = 0; i < oldSquares.length; i++) {
            let offset = 3;
            let lastWasMurge = false;
            for(let j = oldSquares[i].length - 1; j >= 0; j--) {
                if(oldSquares[i][j]) {
                    oldSquares[i][j].style.left = squares[i][offset].offsetLeft + "px";

                    let doMurge = false;
                    if(!lastWasMurge) {
                        for(let n = j - 1; n >= 0; n--) {
                            if(oldSquares[i][n]) {
                                if(oldSquares[i][n].innerText == oldSquares[i][j].innerText) {
                                    doMurge = true;
                                    lastWasMurge = true;
                                }
                                n = -1;
                            }
                        }
                    }
                    else {
                        lastWasMurge = false;
                    }
                    
                    offset -= doMurge ? 0 : 1;
                }
            }
        }

        setTimeout(() => {
            updateSquares();

            clearTempSquares(oldSquares);
        }, animationTime);
    }
    else if(animation == 'up') {
        let oldSquares = createTempSquares();

        for(let i = 0; i < squares.length; i++) {
            for(let j = 0; j < squares[i].length; j++) {
                squares[i][j].innerText = '';
                squares[i][j].className = 'gridSquare';
            }
        }

        for(let i = 0; i < oldSquares[0].length; i++) {
            let offset = 0;
            let lastWasMurge = false;
            for(let j = 0; j < oldSquares.length; j++) {
                if(oldSquares[j][i]) {
                    oldSquares[j][i].style.top = squares[offset][i].offsetTop + "px";

                    let doMurge = false;
                    if(!lastWasMurge) {
                        for(let n = j + 1; n < oldSquares.length; n++) {
                            if(oldSquares[n] && oldSquares[n][i]) {
                                if(oldSquares[n][i].innerText == oldSquares[j][i].innerText) {
                                    doMurge = true;
                                    lastWasMurge = true;
                                }
                                n = 1000;
                            }
                        }
                    }
                    else {
                        lastWasMurge = false;
                    }
                    
                    offset += doMurge ? 0 : 1;
                }
            }
        }

        setTimeout(() => {
            updateSquares();

            clearTempSquares(oldSquares);
        }, animationTime);
    }
    else if(animation == 'down') {
        let oldSquares = createTempSquares();

        for(let i = 0; i < squares.length; i++) {
            for(let j = 0; j < squares[i].length; j++) {
                squares[i][j].innerText = '';
                squares[i][j].className = 'gridSquare';
            }
        }

        for(let i = 0; i < oldSquares[0].length; i++) {
            let offset = 3;
            let lastWasMurge = false;
            for(let j = oldSquares.length-1; j >= 0; j--) {
                if(oldSquares[j][i]) {
                    oldSquares[j][i].style.top = squares[offset][i].offsetTop + "px";

                    let doMurge = false;
                    if(!lastWasMurge) {
                        for(let n = j - 1; n >= 0; n--) {
                            if(oldSquares[n] && oldSquares[n][i]) {
                                if(oldSquares[n][i].innerText == oldSquares[j][i].innerText) {
                                    doMurge = true;
                                    lastWasMurge = true;
                                }
                                n = -1;
                            }
                        }
                    }
                    else {
                        lastWasMurge = false;
                    }
                    
                    offset -= doMurge ? 0 : 1;
                }
            }
        }

        setTimeout(() => {
            updateSquares();

            clearTempSquares(oldSquares);
        }, animationTime);
    }
    else {
        // console.log("HELP"); // for debugging
        for(let i = 0; i < values.length; i++) {
            for(let j = 0; j < values[i].length; j++) {
                if(values[i][j] != 0) {
                    squares[i][j].innerText = values[i][j];

                    if(values[i][j] <= 12288) {
                        squares[i][j].classList = 'gridSquare x' + values[i][j];
                    }
                    else {
                        squares[i][j].classList = 'gridSquare x12288';
                    }
                }
                else {
                    squares[i][j].innerText = '';
                    squares[i][j].classList = 'gridSquare';
                }
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

    values[row][column] = 3;

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
    
    updateSquares('left');
}

function moveRight() {
    for(let i = 0; i < values.length; i++) {
        values[i] = reverse(slide(reverse(values[i])));
    }
    
    updateSquares('right');
}

function moveUp() {
    let flipedValues = flip(values);

    for(let i = 0; i < flipedValues[0].length; i++) {
        flipedValues[i] = slide(flipedValues[i]);
    }

    values = flip(flipedValues);

    updateSquares('up');
}

function moveDown() {
    let flipedValues = flip(values);

    for(let i = 0; i < flipedValues[0].length; i++) {
        flipedValues[i] = reverse(slide(reverse(flipedValues[i])));
    }

    values = flip(flipedValues);

    updateSquares('down');
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

    setTimeout(() => {
        if(!compareValues(JSON.parse(lastValues))) {
            // console.log('spawning squares' + testVar1); // for debugging
            testVar1 ++;
            spawnSquares();
        }
    }, animationTime);
});

function init() {
    initGrid();

    spawnSquares();
    spawnSquares();
}

init();

function test1() {
    initGrid();
    values = [
        [3, 6, 12, 24],
        [48, 96, 192, 384],
        [768, 1536, 3072, 6144],
        [12288, 12288, 12288, 12288]
    ]
    updateSquares();
}
