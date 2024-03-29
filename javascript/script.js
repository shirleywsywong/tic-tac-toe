//ttt for tic tac toe
ttt = {};
ttt.grid = {
    TL: {
        occupy: false,
        character: ""
    },
    TM: {
        occupy: false,
        character: ""
    },
    TR: {
        occupy: false,
        character: ""
    },
    ML: {
        occupy: false,
        character: ""
    },
    MM: {
        occupy: false,
        character: ""
    },
    MR: {
        occupy: false,
        character: ""
    },
    BL: {
        occupy: false,
        character: ""
    },
    BM: {
        occupy: false,
        character: ""
    },
    BR: {
        occupy: false,
        character: ""
    }
}

//hide the game board on page load
ttt.hideGrid = function() {
    $('.grid').hide();
}

//array for index lookup
ttt.positionLookUp = [
    'TL',
    'TM',
    'TR',
    'ML',
    'MM',
    'MR',
    'BL',
    'BM',
    'BR'
]

//run this if user seletcs 1 player mode
ttt.singlePlayer = function() {

    //generate a random number between 0-8
    const generateRandom = function() {
        return Math.floor((Math.random() * 9));
    };

    //use this number to determine the index number of the positionLookUp array
    let randomPosition = generateRandom();
    let computerPositionIndex = ttt.positionLookUp[randomPosition];

    //keep generating a random number for as long as the indexed position is occupied
    while (ttt.grid[computerPositionIndex]['occupy']) {
        randomPosition = generateRandom();
        computerPositionIndex = ttt.positionLookUp[randomPosition];
    };
    
    //set the value of the index to be the ID needed in addingCharacter function
    const computerPositionValue = `#${computerPositionIndex}`
    const computerPositionID = $(computerPositionValue)[0];  //$(#id) -> returns an array [ {dom element}]

    //run addingCharacter function with the parameter of computerPositionID
    ttt.addingCharacter(computerPositionID);

}

//adding character to game board when element is clicked
ttt.addingCharacter = function (clickedBox) {

    //grab the text from the hud that has a class of active
    const turn = $('.turn.active > p').text();

    //set the element as occupied, and add the text to the element
    this.grid[clickedBox.id]["occupy"] = true;
    this.grid[clickedBox.id]["character"] = turn;

    //DOM rendering
    const addCharaterToElement = 
    `<p class="turnAnimate">${turn}</p>
    <span class="sr-only">${turn} is added to ${clickedBox.id}</span>`
    $(clickedBox)
        .html(addCharaterToElement)
        .removeClass('active')
        .addClass('inactive');

    //update the instruction area to indicate whose turn it is
    const nextTurn = $('.turn.inactive > p').text();
    const addNextTurnToInstruction = `It's ${nextTurn}'s turn`;
    $('.instructions > p').html(addNextTurnToInstruction);

    //x: remove active class, add inactive class
    //O: remove inactive class, add active class
    $('.turnX').toggleClass('active inactive');
    $('.turnO').toggleClass('inactive active');

    //check for endgame once something is clicked
    this.check();
}

//check for endgame
ttt.end = false;
ttt.check = function() {

    //shorten some typing
    const checkTL = this.grid['TL'];
    const checkTM = this.grid['TM'];
    const checkTR = this.grid['TR'];
    const checkML = this.grid['ML'];
    const checkMM = this.grid['MM'];
    const checkMR = this.grid['MR'];
    const checkBL = this.grid['BL'];
    const checkBM = this.grid['BM'];
    const checkBR = this.grid['BR'];
    
    const topRow        = checkTL['character'] == checkTM['character'] && checkTM['character'] == checkTR['character'] && checkTR['character'] != "";
    const middleRow     = checkML['character'] == checkMM['character'] && checkMM['character'] == checkMR['character'] && checkMR['character'] != "";
    const bottomRow     = checkBL['character'] == checkBM['character'] && checkBM['character'] == checkBR['character'] && checkBR['character'] != "";
    const leftColumn    = checkTL['character'] == checkML['character'] && checkML['character'] == checkBL['character'] && checkBL['character'] != "";
    const middleColumn  = checkTM['character'] == checkMM['character'] && checkMM['character'] == checkBM['character'] && checkBM['character'] != "";
    const rightColumn   = checkTR['character'] == checkMR['character'] && checkMR['character'] == checkBR['character'] && checkBR['character'] != "";
    const leftDiagonal  = checkTL['character'] == checkMM['character'] && checkMM['character'] == checkBR['character'] && checkBR['character'] != "";
    const rightDiagonal = checkTR['character'] == checkMM['character'] && checkMM['character'] == checkBL['character'] && checkBL['character'] != "";

    //check for each win combination, and tie game at the end
    if (topRow) {
        this.end = true;
        $('#TL').addClass('win');
        $('#TM').addClass('win');
        $('#TR').addClass('win');
        $('.instructions > p').html(`${checkTL['character']} wins!`);
        this.resetButtonRendering();
    } else if (middleRow) {
        this.end = true;
        $('#ML').addClass('win');
        $('#MM').addClass('win');
        $('#MR').addClass('win');
        $('.instructions > p').html(`${checkML['character']} wins!`);
        this.resetButtonRendering();
    } else if (bottomRow) {
        this.end = true;
        $('#BL').addClass('win');
        $('#BM').addClass('win');
        $('#BR').addClass('win');
        $('.instructions > p').html(`${checkBL['character']} wins!`);
        this.resetButtonRendering();
    } else if (leftColumn) {
        this.end = true;
        $('#TL').addClass('win');
        $('#ML').addClass('win');
        $('#BL').addClass('win');
        $('.instructions > p').html(`${checkTL['character']} wins!`);
        this.resetButtonRendering();
    } else if (middleColumn) {
        this.end = true;
        $('#TM').addClass('win');
        $('#MM').addClass('win');
        $('#BM').addClass('win');
        $('.instructions > p').html(`${checkTM['character']} wins!`);
        this.resetButtonRendering();
    } else if (rightColumn) {
        this.end = true;
        $('#TR').addClass('win');
        $('#MR').addClass('win');
        $('#BR').addClass('win');
        $('.instructions > p').html(`${checkTR['character']} wins!`);
        this.resetButtonRendering();
    } else if (leftDiagonal) {
        this.end = true;
        $('#TL').addClass('win');
        $('#MM').addClass('win');
        $('#BR').addClass('win');
        $('.instructions > p').html(`${checkTL['character']} wins!`);
        this.resetButtonRendering();
    } else if (rightDiagonal) {
        this.end = true;
        $('#TR').addClass('win');
        $('#MM').addClass('win');
        $('#BL').addClass('win');
        $('.instructions > p').html(`${checkTR['character']} wins!`);
        this.resetButtonRendering();
    } else if (checkTL['occupy'] && checkTM['occupy'] && checkTR['occupy'] && checkML['occupy'] && checkMM['occupy'] && checkMR['occupy'] && checkBL['occupy'] && checkBM['occupy'] && checkBR['occupy'] === true) {
        this.end = true;
        $('#TL').addClass('win');
        $('#TM').addClass('win');
        $('#TR').addClass('win');
        $('#ML').addClass('win');
        $('#MM').addClass('win');
        $('#MR').addClass('win');
        $('#BL').addClass('win');
        $('#BM').addClass('win');
        $('#BR').addClass('win');
        $('.instructions > p').html(`Tie Game!`);
        this.resetButtonRendering();
    }
}

//rendering the reset button
ttt.resetButtonRendering = function () {

    $('.hud')
    .addClass('reset')
    .html(`
        <div class="turn active">
            <p>Play Again!</p>
        </div>
    `);

    //listen for when the user clicked the reset button
    $('.hud').on('click', this.reset);
}

//the spinning circle on empty game board
ttt.svg = `<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="galactic-republic"
            class="svg-inline--fa fa-galactic-republic fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512">
            <path fill="currentColor"
                d="M248 504C111.25 504 0 392.75 0 256S111.25 8 248 8s248 111.25 248 248-111.25 248-248 248zm0-479.47C120.37 24.53 16.53 128.37 16.53 256S120.37 487.47 248 487.47 479.47 383.63 479.47 256 375.63 24.53 248 24.53zm27.62 21.81v24.62a185.933 185.933 0 0 1 83.57 34.54l17.39-17.36c-28.75-22.06-63.3-36.89-100.96-41.8zm-55.37.07c-37.64 4.94-72.16 19.8-100.88 41.85l17.28 17.36h.08c24.07-17.84 52.55-30.06 83.52-34.67V46.41zm12.25 50.17v82.87c-10.04 2.03-19.42 5.94-27.67 11.42l-58.62-58.59-21.93 21.93 58.67 58.67c-5.47 8.23-9.45 17.59-11.47 27.62h-82.9v31h82.9c2.02 10.02 6.01 19.31 11.47 27.54l-58.67 58.69 21.93 21.93 58.62-58.62a77.873 77.873 0 0 0 27.67 11.47v82.9h31v-82.9c10.05-2.03 19.37-6.06 27.62-11.55l58.67 58.69 21.93-21.93-58.67-58.69c5.46-8.23 9.47-17.52 11.5-27.54h82.87v-31h-82.87c-2.02-10.02-6.03-19.38-11.5-27.62l58.67-58.67-21.93-21.93-58.67 58.67c-8.25-5.49-17.57-9.47-27.62-11.5V96.58h-31zm183.24 30.72l-17.36 17.36a186.337 186.337 0 0 1 34.67 83.67h24.62c-4.95-37.69-19.83-72.29-41.93-101.03zm-335.55.13c-22.06 28.72-36.91 63.26-41.85 100.91h24.65c4.6-30.96 16.76-59.45 34.59-83.52l-17.39-17.39zM38.34 283.67c4.92 37.64 19.75 72.18 41.8 100.9l17.36-17.39c-17.81-24.07-29.92-52.57-34.51-83.52H38.34zm394.7 0c-4.61 30.99-16.8 59.5-34.67 83.6l17.36 17.36c22.08-28.74 36.98-63.29 41.93-100.96h-24.62zM136.66 406.38l-17.36 17.36c28.73 22.09 63.3 36.98 100.96 41.93v-24.64c-30.99-4.63-59.53-16.79-83.6-34.65zm222.53.05c-24.09 17.84-52.58 30.08-83.57 34.67v24.57c37.67-4.92 72.21-19.79 100.96-41.85l-17.31-17.39h-.08z">
            </path>
        </svg>`;

//let user play the game again
ttt.reset = function () {

    //when reset is clicked, reset all values in ttt.grid
    $.each(ttt.grid, function(index, value){
        value['occupy'] = false;
        value['character'] = '';
    })

    //resetting game board
    $('.instructions > p')
        .html(`Start with X`);

    $('.item')
        .removeClass('inactive')
        .removeClass('win')
        .addClass('active')
        .html(ttt.svg);

    //resetting the hud
    $('.hud')
        .removeClass('reset')
        .html(`
        <div class="turn turnX active">
            <p>X</p>
        </div>
        <div class="turn turnO inactive">
            <p>O</p>
        </div>
    `);

    //remove the reset button function
    $('.hud').off('click');

    //let the game begin again
    ttt.end = false;
}

//listen for 1-player mode or 2-player mode 
ttt.singleP = false;
ttt.init = function() {

    //if 1-player mode is selected, reveal the game board
    $('#singleP').on('click', function() {
        ttt.singleP = true;
        //reveal the gameboard
        $('.gridOverlay').hide();
        $('.grid').show();
    });

    //if 2-player mode is selected, just reveal the game board
    $('#twoP').on('click', function() {
        //reveal the gameboard
        $('.gridOverlay').hide();
        $('.grid').show();
    })

    //game starts
    $('.item').on('click', function() {

        //keep running the game as long as a win or tie hasn't happened
        if (ttt.end === false) {

            //if an element is clicked, can't click it again
            if (ttt.grid[this.id]["occupy"]) {
                $('.instructions > p').html('Pick an empty spot');
            } else {
                
                //'this' is 'clickedBox'
                ttt.addingCharacter(this);

                //if single player mode, and if player's last move didn't end the game, run singleplayer function
                if (ttt.singleP === true && ttt.end === false) { 
                    ttt.singlePlayer();
                }
            }
        }
    })
}

$(function(){
    //hide gameboard and let user choose single or two players
    ttt.hideGrid();
    ttt.init();
})