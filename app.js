// GLOBAL HIDE UPPER KEYBOARD ON PAGE LOAD
$('#keyboard-upper-container').hide();

let startTime;
let endGame = false;
let startTiming = false;
let numberOfWords = 54;
let elapsedMinutes;
let wordsPerMinute;
let numberOfMistakes = 0;


// SHORT SENTENCES FOR CONVENIENCE IN TESTING
let sentences = ['ten ate ', 
                    'Too ato ', 
                    'oat itain ', 
                    'itant eate ', 
                    'nee ene',];

// let sentences = ['ten ate neite ate nee enet ite ate inet ent eate ', 
//                     'Too ato too nOt enot one totA not anot tOO aNot ', 
//                     'oat itain oat tain nate eate tea anne inant nean ', 
//                     'itant eate anot eat nato inate eat anot tain eat ', 
//                     'nee ene ate ite tent tiet ent ine ene ete ene ate',
// ];

// TESTING FOR LAG
// let sentences = ['tttttttttttttttttttttttttttttttttttttttttttttttt ', 
//                     'Ttttttttttttttttttttttttttttttttttttttttttttttt ', 
//                     'otttttttttttttttttttttttttttttttttttttttttttttt ', 
//                     'itttttttttttttttttttttttttttttttttttttttttttttt ', 
//                     'nttttttttttttttttttttttttttttttttttttttttttttt'];

let i = 0;
let j = 0;
let q = 1;
let pixels = 20;
let letterCounter = 0;
let sentenceCounter = 0;
let yellowBlockCounter = 0;
let nextLetter = sentences[i][j];
$('#sentence').append(sentences[i]);
$('#target-letter').append(nextLetter);

let keystroke = new Audio('typewriter-key.wav');

// setTimeout(() => { }, 1000);



// TOGGLE UPPER AND LOWER KEYBOARDS ON SHIFT KEYDOWN/UP
$(document).keydown(function(e) {
    if (e.keyCode == 16) {
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
    };
}).keyup(function(e) {
    if (e.keyCode == 16) {
        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    };
});


// EVERYTHING THAT HAPPENS WHEN A KEY IS PRESSED
$(document).keypress(function(event) {
    let keyPress = event.keyCode || event.which;

    keystroke.play();
    
    highlightPressedKey(keyPress);

    // NEED TO RESET THIS WHEN THE GAME RESTARTS
    if (startTiming == false) {
        startTiming = true;
        startTime = new Date().getTime();
    };

    
    // NEED TO RESET ENDGAME TO FALSE SOMEWHERE
    // NEED TO REMOVE TEXT-ALIGN CENTER FROM #SENTENCES ON RESET
    // NEED TO PUT YELLOW BOX BACK
    // PROBABLY NEED TO PUT STARTING LETTER BACK IN #TARGET-LETTER

    
    if (endGame == false) {
        // sentences[i][j].css(backgroundColor, 'mediumslateblue')
        getNextLetter();
        placeNextExpectedLetter();
        placeGlyphicon(keyPress);
        moveYellowBlock();

        // Experiencing some lag after moving the if statement and letterCounter++ here.
        // If it continues, move back to resetDisplay function.
        letterCounter++;
        if (letterCounter == sentences[i].length) {
            resetDisplay();
        };
    };    


});



// HIGHLIGHT KEYS IN BROWSER WHEN PRESSED ON KEYBOARD, WAIT, SET TO TRANSPARENT
function highlightPressedKey(keyPress) {
    $(`#${keyPress}`).css('background-color', 'rgb(150, 140, 240)');
    setTimeout(() => {
        $(`#${keyPress}`).css(
            'background-color', 'white'
        );
    }, 100);
};



// GET NEXT LETTER AND NEXT EXPECTED LETTER
function getNextLetter() {
    nextLetter = sentences[i][j];
    nextExpectedLetter = sentences[i][q];
    j++;
    q++;
    // return nextLetter;
};



// PLACE NEXT EXPECTED IN TARGET DIV, SHOW SPACEBAR FOR SPACE
function placeNextExpectedLetter() {
    $('#target-letter').empty();
    
    if (nextExpectedLetter == ' ') {
        let space = $('<div id = target-letter-space> spacebar </div>')
        $('#target-letter').append(space);
    } else {
        $('#target-letter').append(nextExpectedLetter)
    };
};



// COMPARE keyPress TO nextLetter, PLACE GLYPHICON ICON IN FEEDBACK DIV 
function placeGlyphicon(keyPress) {
    if (keyPress == nextLetter.charCodeAt(0)) {
        let $glyphOk = $('<span>').addClass('glyphicon glyphicon-ok');
        $('#feedback').append($glyphOk);
    } else {
        let $glyphRemove = $('<span>').addClass('glyphicon glyphicon-remove');
        $('#feedback').append($glyphRemove);
        numberOfMistakes++;
    };
};



// MOVE YELLOW BLOCK ACROSS THE SCREEN, RESET AT END OF SENTENCE
function moveYellowBlock() {
    let yellowBlock = $('#yellow-block');
    pixels += 17.5;
    yellowBlock.css('left', pixels);

    yellowBlockCounter++;

    if (yellowBlockCounter == sentences[i].length) {
        pixels = 20;
        yellowBlock.css('left', '20px');
        yellowBlockCounter = 0;
    };
};



// RESET OR INCREMENT VARIABLES, RESET DISPLAY DIV AT END OF SENTENCE
function resetDisplay() {
    $('#sentence').empty();
    $('#feedback').empty();
    i++;
    j = 0;
    q = 1;
    pixels = 20;
    sentenceCounter++;
    letterCounter = 0;
    $('#sentence').append(sentences[i]);
    
    if (sentenceCounter == sentences.length) {
        endGameScenario();
    } else {
        nextLetter = sentences[i][j];
        $('#target-letter').append(nextLetter);      
    };
};



// FIGURE WPM AND CALL END GAME FUNCTIONS / RESET OPTION
function endGameScenario() {    
    endGame = true;
    // console.log('Over it!');
    let elapsedTime = new Date().getTime() - startTime;
    elapsedMinutes = elapsedTime / 60000;
    wordsPerMinute = parseInt(numberOfWords / elapsedMinutes);
    
    appendEndGameMessage();
    
    let resetButton = $('<button id="reset-button"> Reset Game? </button>');
    resetButton.click(function() {
        location.reload();
    })

    setTimeout(() => {
        $('#target-letter').append(resetButton);
    }, 2000);
    
};



// SET AND APPEND END OF GAME MESSAGE 
function appendEndGameMessage() {
    if (wordsPerMinute > 50) {
        wordsPerMinuteMessage = 
            `Wow! You typed ${wordsPerMinute} words per minute,<br>`;
    } else if (wordsPerMinute > 35 ){
        wordsPerMinuteMessage = 
            `Not bad! You typed ${wordsPerMinute} words per minute,<br>`
    } else {
        wordsPerMinuteMessage = 
            `Ouch! You only typed ${wordsPerMinute} words per minute,<br>`
    };

    if (wordsPerMinute > 35) {
        if (numberOfMistakes > 5) {
            mistakesMessage = `but you also had ${numberOfMistakes} mistakes!`;
        } else {
            mistakesMessage = `and you only had ${numberOfMistakes} mistakes!`;
        };
    } else {
        if (numberOfMistakes > 5) {
            mistakesMessage = `and you had ${numberOfMistakes} mistakes!`;
        } else {
            mistakesMessage = `but at least you only had ${numberOfMistakes} mistakes!`;
        };
    };
    
    let endGameMessage = `${wordsPerMinuteMessage}${mistakesMessage}`;
    $('#sentence').append(endGameMessage).css('text-align', 'center');
};
    