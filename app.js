// GLOBAL HIDE UPPER KEYBOARD ON PAGE LOAD
$('#keyboard-upper-container').hide();

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 
                    'Too ato too nOt enot one totA not anot tOO aNot', 
                    'oat itain oat tain nate eate tea anne inant nean', 
                    'itant eate anot eat nato inate eat anot tain eat', 
                    'nee ene ate ite tent tiet ent ine ene ete ene ate'];

let i = 0;
let j = 0;
let q = 1;
letterCounter = 0;
$('#sentence').append(sentences[i]);
let nextLetter = sentences[i][j];
// let nextLetterPlus = sentences[i][q]
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
    // console.log(keyPress);
    $(`#${keyPress}`).css({backgroundColor: 'mediumslateblue'});
    setTimeout(() => {
        $(`#${keyPress}`).css({backgroundColor: 'rgb(0,0,0,0'});
    }, 100);
    
    getNextLetter();
    getNextExpectedLetter();
    $('#target-letter').empty()
    $('#target-letter').append(nextExpectedLetter)
    if (keyPress == nextLetter.charCodeAt(0)) {
        console.log('yes');
    };

    letterCounter++;
    if (letterCounter == sentences[i].length) {
        $('#sentence').empty();
        i++;
        j = 0;
        letterCounter = 0;
        $('#sentence').append(sentences[i]);
    };
});



function getNextLetter() {
    nextLetter = sentences[i][j];
    // console.log(nextLetter);
    j++;
    return nextLetter;
};

//This function needs to return nextLetter at start of each sentence and 
//nextExpectedLetter the rest of the time
//needs to return '<space>' on empty string
function getNextExpectedLetter() {
    nextExpectedLetter = sentences[i][q];
    q++;
    return nextExpectedLetter;
}



// getNextLetter();
// getNextLetter();
// console.log(nextLetter);

// let nextLetter = '';




// setTimeout(() => { }, 1000);


