let grid = document.getElementById('grid');
let refreshButton = document.getElementById('refreshButton');
let blackButton = document.getElementById('drawBlack');
let randomButton = document.getElementById('drawRandom');
let gradientButton = document.getElementById('drawGradient');
let eraseButton = document.getElementById('erase');
let buttons = document.querySelectorAll('button');
let selectedMode = undefined;

// Generate a 50x50 grid on page load 
const gridSize = 500;
let squaresNumber = 2500;
generateGrid(squaresNumber);

// Generation of the grid's squares
function generateGrid(squaresNumber) {
    // Calcul of the squares sizes (height and width)
    let squaresSizes = gridSize / (Math.sqrt(squaresNumber));

    // Erase preexistent divs
    while (grid.lastChild) {
        grid.removeChild(grid.lastChild);
    }

    for (let i = 0; i < squaresNumber; i++) {
        let square = document.createElement('div');
        square.style.height = squaresSizes + 'px';
        square.style.width = squaresSizes + 'px';
        grid.appendChild(square);
    }

    // draw Black mode selected on page load and after every refresh
    selectedMode = 'drawBlack';
    drawBG(drawBlack);
}

// Refresh button function
refreshButton.addEventListener('click', refresh);

function refresh() {
    let gridSize = prompt('How many squares per side would you like?');
    while (gridSize > 100) { gridSize = prompt('Choose a size smaller than 100') };
    squaresNumber = gridSize * gridSize;
    generateGrid(squaresNumber);
}

// Drawing functions  ---------------------------------------------------------------------------------------------

// Drawing mode selection
blackButton.addEventListener('click', function() {
    selectedMode = 'drawBlack';
    drawBG(drawBlack);
});
randomButton.addEventListener('click', function() {
    selectedMode = 'drawRandom';
    drawBG(drawRandom);
});
gradientButton.addEventListener('click', function() {
    selectedMode = 'drawGradient';
    drawBG(drawGradient);
});
eraseButton.addEventListener('click', function() {
    selectedMode = 'erase';
    drawBG(erase);
});

function drawBG(drawingMode) {
    // Change the background Color of the selected drawing mode button
    changeButtonBackground();

    // Creation of 'squares', an array of all the individual squares
    let squares = Array.from(grid.children);

    // Listen for each item of 'squares' array a mouseenter event
    squares.forEach(square => square.addEventListener('mouseenter', drawingMode));
}

// Change the background color of the target div to black
function drawBlack(e) {
    if (selectedMode !== 'drawBlack') { return; };
    e.target.style.backgroundColor = "black";
    e.target.style.opacity = 1;
}

// Change the background color of the target div to random color
function drawRandom(e) {
    if (selectedMode !== 'drawRandom') { return; };
    e.target.style.backgroundColor = `rgb(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()})`;
    e.target.style.opacity = 1;
}

function randomColorValue() {
    let colorValue = Math.floor(Math.random() * 255);
    return colorValue;
}

// Change the background color of the target div to 10% darker
function drawGradient(e) {
    if (selectedMode !== 'drawGradient') { return; };
    e.target.style.backgroundColor = 'black';
    let opacity = Number(e.target.style.opacity);
    e.target.style.opacity = opacity + 0.1;
}

// Erase the the background color to initial state
function erase(e) {
    if (selectedMode !== 'erase') { return; };
    e.target.style.backgroundColor = 'white';
    e.target.style.opacity = null;
}

// ---------------------------------------------------------------------------------------------

// Change the Background Color of the selected drawing mode Button
function changeButtonBackground() {
    buttons.forEach(button => button.classList.remove('selectedButton'));

    if (selectedMode == 'drawBlack') {
        blackButton.classList.add('selectedButton');
    }
    if (selectedMode == 'drawRandom') {
        randomButton.classList.add('selectedButton');
    }
    if (selectedMode == 'drawGradient') {
        gradientButton.classList.add('selectedButton');
    }
    if (selectedMode == 'erase') {
        eraseButton.classList.add('selectedButton');
    }
}