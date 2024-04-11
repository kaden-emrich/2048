const gameDiv = document.getElementById('game');
const cssRoot = document.querySelector(':root');

var squares = [[]];
var values = [];

var animationTime = 100;
const gridBorderWidth = 5;

function setAnimationTime(timeMS) {
    animationTime = timeMS;
    cssRoot.style.setProperty('--animation-time', animationTime + 'ms');
}

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

function getSubpixelHeightOffset() {
    return (window.innerHeight % 2) / 2;
}

function getSubpixelWidthOffset() {
    return (window.innerWidth % 2) == 0 ? 0 : 0.5;
}

function createTempSquares() {
    let oldSquares = [[], [], [], []];
    for(let i = 0; i < squares.length; i++) {
        for(let j = 0; j < squares[i].length; j++) {
            if(squares[i][j].classList.length > 1) {
                let nextSquare = document.createElement('div');
                nextSquare.classList = squares[i][j].classList;
                nextSquare.classList.add('animation-square');
                nextSquare.style.top = (squares[i][j].offsetTop) + 'px';
                nextSquare.style.left = (squares[i][j].offsetLeft - getSubpixelWidthOffset()) + 'px';
                nextSquare.style.width = (squares[i][j].offsetWidth - gridBorderWidth*2) + 'px';
                nextSquare.style.height = (squares[i][j].offsetHeight - gridBorderWidth*2 - getSubpixelHeightOffset()) + 'px';
                /* 
                    Previously, when the tiles were animated the text inside would move a just noticable amount.
                    The only conclusion I could come to was that it had to do with subpixel rendering.
                    I have no idea why the getSubpixelHeightOffset() works. 
                    I was literally just like "I wonder what happens if I add 0.5 to the height calculation" 
                    and it fixed the weird text wobble.
                    Eventually, I realized that when the vertical resolution was an even number, the wobble would come back.
                    Thats how this solution came about.
                    As for the getSubpixelWidthOffset() I have no clue why but it works with the left attribute instead of width.
                    In conclusion: I have a headache, CSS is stupid, JS is stupid, everything is stupid, and trial and error works.
                */
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

function clearTempSquares() {
    let oldSquares = document.querySelectorAll('.animation-square');
    oldSquares.forEach((squ) => {
        if(squ != null) {
            squ.remove();
        }
    });
}

function startMurge(oldSquares, a1, a2, b1, b2) {
    let oldNum = oldSquares[a1][a2].innerText;
    oldSquares[a1][a2].classList.remove("x" + oldNum);
    oldSquares[a1][a2].classList.add("x" + (oldNum*2), "merge-square");
    oldSquares[b1][b2].classList.remove("x" + oldNum);
    oldSquares[b1][b2].classList.add("x" + (oldNum*2), "merge-square");

    setTimeout(() => {
        oldSquares[a1][a2].innerText = (oldNum*2);
        oldSquares[b1][b2].innerText = (oldNum*2);
        oldSquares[a1][a2].classList.remove("merge-square");
        oldSquares[b1][b2].classList.remove("merge-square");
    }, animationTime/2);
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
                    oldSquares[i][j].style.left = (squares[i][offset].offsetLeft - getSubpixelWidthOffset()) + "px";

                    let doMurge = false;
                    if(!lastWasMurge) {
                        for(let n = j + 1; n < oldSquares[i].length; n++) {
                            if(oldSquares[i][n]) {
                                if(oldSquares[i][n].innerText == oldSquares[i][j].innerText) {
                                    doMurge = true;
                                    lastWasMurge = true;
                                    startMurge(oldSquares, i, n, i, j);
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
                    oldSquares[i][j].style.left = (squares[i][offset].offsetLeft - getSubpixelWidthOffset()) + "px";

                    let doMurge = false;
                    if(!lastWasMurge) {
                        for(let n = j - 1; n >= 0; n--) {
                            if(oldSquares[i][n]) {
                                if(oldSquares[i][n].innerText == oldSquares[i][j].innerText) {
                                    doMurge = true;
                                    lastWasMurge = true;
                                    startMurge(oldSquares, i, n, i, j);
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
                                    startMurge(oldSquares, n, i, j, i);
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
                                    startMurge(oldSquares, n, i, j, i);
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

        clearTempSquares();
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

function moveLeft(test = false) {
    let output = [...values];
    for(let i = 0; i < output.length; i++) {
        output[i] = slide(output[i]);
    }

    if(test) {
        return output;
    }
    else {
        values = output;
        updateSquares('left');
    }
}

function moveRight(test = false) {
    let output = [...values];
    for(let i = 0; i < output.length; i++) {
        output[i] = reverse(slide(reverse(output[i])));
    }

    if(test) {
        return output;
    }
    else {
        values = output;
        updateSquares('right');
    }
}

function moveUp(test = false) {
    let flipedValues = flip(values);

    for(let i = 0; i < flipedValues[0].length; i++) {
        flipedValues[i] = slide(flipedValues[i]);
    }

    let output = flip(flipedValues);

    if(test) {
        return output;
    }
    else {
        values = output;
        updateSquares('up');
    }
}

function moveDown(test = false) {
    let flipedValues = flip(values);

    for(let i = 0; i < flipedValues[0].length; i++) {
        flipedValues[i] = reverse(slide(reverse(flipedValues[i])));
    }

    let output = flip(flipedValues);

    if(test) {
        return output;
    }
    else {
        values = output;
        updateSquares('down');
    }
    
}

function testGameOver() {
    if(!compareValues(moveLeft(true))) {
        return false;
    }

    if(!compareValues(moveRight(true))) {
        return false;
    }

    if(!compareValues(moveUp(true))) {
        return false;
    }

    if(!compareValues(moveDown(true))) {
        return false;
    }

    return true;
}

function gameOver() {
    alert("game over");
}

document.addEventListener('keyup', (event) => {
    let lastValues = JSON.stringify(values);

    switch(event.key) {
        case 'ArrowUp':
            updateSquares();
            moveUp();
            break;
        case 'ArrowDown':
            updateSquares();
            moveDown();
            break;
        case 'ArrowLeft':
            updateSquares();
            moveLeft();
            break;
        case 'ArrowRight':
            updateSquares();
            moveRight();
            break;
        case 'r':
        case 'R':
            reset();
            return;
    }

    setTimeout(() => {
        if(testGameOver()) {
            gameOver();
        }
        else if(!compareValues(JSON.parse(lastValues))) {
            spawnSquares();
        }
    }, animationTime);
});

function reset() {
    initGrid();

    spawnSquares();
    spawnSquares();
}

function init() {
    setAnimationTime(100);
    reset();
}

init();

