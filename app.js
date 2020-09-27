// GLOBAL ENDGAME VARIABLES
let startTime;
let endGame = false;
let startTiming = false;
let numberOfWords = 54;
let elapsedMinutes;
let wordsPerMinute;
let numberOfMistakes = 0;


// GLOBAL SENTENCES ARRAY
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate ', 
                    'Too ato too nOt enot one totA not anot tOO aNot ', 
                    'oat itain oat tain nate eate tea anne inant nean ', 
                    'itant eate anot eat nato inate eat anot tain eat ', 
                    'nee ene ate ite tent tiet ent ine ene ete ene ate',
];                    


// GLOBAL COUNTERS, ETC
let i = 0;
let j = 0;
let q = 1;
let pixels = 20;
let letterCounter = 0;
let sentenceCounter = 0;
let yellowBlockCounter = 0;
let nextLetter = sentences[i][j];


// GLOBAL AUDIO
let typewriterKeystrokeAudio = new Audio('typewriterKeystroke.wav');
let typewriterBellAudio = new Audio('typewriterBell.wav');
let typewriterBellAndCarriageAudio = new Audio('typewriterBellAndCarriage.wav');


// ON PAGE LOAD: HIDE UPPERCASE KEYBOARD, APPEND FIRST SENTENCE/FIRST TARGET LETTER
$('#keyboard-upper-container').hide();
$('#sentence').append(sentences[i]);
$('#target-letter').append(nextLetter);


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


// DRIVE THE GAME BASED ON EVERYTHING THAT HAPPENS WHEN A KEY IS PRESSED
$(document).keypress(function(event) {
    let keyPress = event.keyCode || event.which;

    // GAME FUNCTIONS TO RUN ON EVERY KEYSTROKE 
    highlightPressedKey(keyPress);
    typewriterKeystrokeAudio.play();


    // START TIMING ON FIRST KEYSTROKE ONLY
    if (startTiming == false) {
        startTiming = true;
        startTime = new Date().getTime();
    };
    
    // GAME FUNCTIONS TO RUN ON EVERY KEYSTROKE UNTIL WE HIT ENDGAME
    if (endGame == false) {
        getNextLetter();
        placeNextExpectedLetter();
        placeGlyphicon(keyPress);
        moveYellowBlock();
        
        // Experiencing some lag after moving the if statement & letterCounter++ here.
        // If it continues, move back to resetDisplay function.
        letterCounter++;
        if (letterCounter == sentences[i].length) {
            resetDisplay();
        };
    };    
    
        
        // INITIAL THOUGHTS ON RESETTING THE GAME INSTEAD OF RELOADING: 
        // NEED TO RESET ENDGAME TO FALSE SOMEWHERE
        // NEED TO REMOVE TEXT-ALIGN CENTER FROM #SENTENCES ON RESET
        // NEED TO PUT YELLOW BOX BACK
        // PROBABLY NEED TO PUT STARTING LETTER BACK IN #TARGET-LETTER
});



// HIGHLIGHT KEYS IN BROWSER WHEN PRESSED ON KEYBOARD, WAIT, REMOVE HIGHLIGHTING
function highlightPressedKey(keyPress) {
    $(`#${keyPress}`).css('border-color', 'rgb(0, 0, 0)');
    setTimeout(() => {
        $(`#${keyPress}`).css(
            'border-color', 'rgb(255, 255, 255)'
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
        typewriterBellAudio.play();
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
    typewriterBellAndCarriageAudio.play();

    let resetButton = $('<button id="reset-button"> Reset Game? </button>');
    resetButton.click(function() {
        location.reload();
    })

    setTimeout(() => {
        $('#target-letter').append(resetButton);
    }, 2500);
    
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
            mistakesMessage = `but you also made ${numberOfMistakes} mistakes!`;
        } else if (numberOfMistakes == 1) {
            mistakesMessage = `and you only made 1 mistake!`;
        } else if (numberOfMistakes == 0) { 
            mistakesMessage = `and you didn't make any mistakes!`;
        }else {
            mistakesMessage = `and you only made ${numberOfMistakes} mistakes!`;
        };
    } else {
        if (numberOfMistakes > 5) {
            mistakesMessage = `and you made ${numberOfMistakes} mistakes!`;
        } else if (numberOfMistakes == 1) {
            mistakesMessage = `but at least you only made 1 mistake!`;
        } else if (numberOfMistakes == 0) { 
            mistakesMessage = `but at least you didn't make any mistakes!`;
        }else {
            mistakesMessage = `but at least you only made ${numberOfMistakes} mistakes!`;
        };
    };
    
    let endGameMessage = `${wordsPerMinuteMessage}${mistakesMessage}`;
    $('#sentence').append(endGameMessage).css('text-align', 'center');
};
    