// GLOBAL HIDE UPPER KEYBOARD ON PAGE LOAD
$('#keyboard-upper-container').hide();

// let sentences = ['ten ate ', 
//                     'Too ato ', 
//                     'oat itain ', 
//                     'itant eate ', 
//                     'nee ene'];


let sentences = ['ten ate neite ate nee enet ite ate inet ent eate ', 
                    'Too ato too nOt enot one totA not anot tOO aNot ', 
                    'oat itain oat tain nate eate tea anne inant nean ', 
                    'itant eate anot eat nato inate eat anot tain eat ', 
                    'nee ene ate ite tent tiet ent ine ene ete ene ate'];

// let sentences = ['tttttttttttttttttttttttttttttttttttttttttttttttt ', 
//                     'Ttttttttttttttttttttttttttttttttttttttttttttttt ', 
//                     'otttttttttttttttttttttttttttttttttttttttttttttt ', 
//                     'itttttttttttttttttttttttttttttttttttttttttttttt ', 
//                     'nttttttttttttttttttttttttttttttttttttttttttttt'];

let i = 0;
let j = 0;
let q = 1;
let letterCounter = 0;
let nextLetter = sentences[i][j];
$('#sentence').append(sentences[i]);
$('#target-letter').append(nextLetter)


// sentences[i][j].css(backgroundColor, 'mediumslateblue')


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

// HIGHLIGHT KEYS IN BROWSER WHEN PRESSED ON KEYBOARD, WAIT, REMOVE
$(document).keypress(function(event) {
    let keyPress = event.keyCode || event.which;
    highlightPressedKey(keyPress);
    getNextLetter();
    // getNextExpectedLetter();
    placeNextExpectedLetter();
    placeGlyphicon(keyPress);
    
    // Experiencing some lag after moving the if statement an letterCounter++ here.
    // If it continues, move back to resetDisplay function.
    letterCounter++;
    if (letterCounter == sentences[i].length) {
        resetDisplay();
    };
});

function highlightPressedKey(keyPress) {
    $(`#${keyPress}`).css({backgroundColor: 'rgb(150, 140, 240'});
    setTimeout(() => {
        $(`#${keyPress}`).css(
            {backgroundColor: 'rgb(150, 140, 240, 0'}
        );
    }, 100);
};

function getNextLetter() {
    nextLetter = sentences[i][j];
    nextExpectedLetter = sentences[i][q];
    j++;
    q++;
    // return nextLetter;
};

//This function needs to return nextLetter at start of each sentence and 
//nextExpectedLetter the rest of the time
//needs to return '<space>' on empty string
function getNextExpectedLetter() {
    // return nextExpectedLetter;
};

function placeNextExpectedLetter() {
    $('#target-letter').empty();
    
    if (nextExpectedLetter == ' ') {
        let space = $('<div id = target-letter-space> spacebar </div>')
        $('#target-letter').append(space);
    } else {
        $('#target-letter').append(nextExpectedLetter)
    };
}


function placeGlyphicon(keyPress) {
    if (keyPress == nextLetter.charCodeAt(0)) {
        let $glyphOk = $('<span>').addClass('glyphicon glyphicon-ok')
        $('#feedback').append($glyphOk);
    } else {
        let $glyphRemove = $('<span>').addClass('glyphicon glyphicon-remove')
        $('#feedback').append($glyphRemove);
    };
};

function resetDisplay() {
    // letterCounter++;
    // if (letterCounter == sentences[i].length) {
    $('#sentence').empty();
    $('#feedback').empty();
    i++;
    j = 0;
    q = 1;
    letterCounter = 0;
    $('#sentence').append(sentences[i]);

    nextLetter = sentences[i][j];
    $('#target-letter').append(nextLetter);
    // return i;
};

// };

// setTimeout(() => { }, 1000);


// THIS WAS IN KEYPRESS FUNCTION. REPLACED WITH placeGlyphicon(keyPress)
// if (keyPress == nextLetter.charCodeAt(0)) {
    // console.log('yes');
    // };    
    //     let $glyphOk = $('<span>').addClass('glyphicon glyphicon-ok')
    //     $('#feedback').append($glyphOk);
    
    // } else {
        //     let $glyphRemove = $('<span>').addClass('glyphicon glyphicon-remove')
    //     $('#feedback').append($glyphRemove);
    // };
    