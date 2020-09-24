// GLOBAL HIDE UPPER KEYBOARD ON PAGE LOAD
$('#keyboard-upper-container').hide();

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 
                    'Too ato too nOt enot one totA not anot tOO aNot', 
                    'oat itain oat tain nate eate tea anne inant nean', 
                    'itant eate anot eat nato inate eat anot tain eat', 
                    'nee ene ate ite tent tiet ent ine ene ete ene ate'];





// TOGGLE UPPER AND LOWER KEYBOARDS ON SHIFT KEYDOWN/UP
$(document).keydown(function(e) {
    if (e.keyCode == 16) {
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
    }
}).keyup(function(e) {
    if (e.keyCode == 16) {
        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    }
});

// HIGHLIGHT KEYS IN BROWSER WHEN PRESSED ON KEYBOARD, WAIT, REMOVE
$(document).keypress(function(event) {
    let keyPress = event.keyCode || event.which;
    console.log(keyPress);
    $(`#${keyPress}`).css({backgroundColor: 'mediumslateblue'});
    setTimeout(() => {
        $(`#${keyPress}`).css({backgroundColor: 'rgb(0,0,0,0'});
    }, 100);
});


let i = 0;
let j = 0;
$('#sentence').append(sentences[i]);
for (let letter of sentences[i]) {
    console.log(letter);
}

expectedLetter();
expectedLetter();

function expectedLetter() {
    let nextLetter = sentences[i][j];
    console.log(nextLetter);
    j++;
    return nextLetter;
}


// setTimeout(() => { }, 1000);


// for (let i = 0; i < sentences.length; i++) {
//     const x = sentences[i];
//     $('#sentence').append(x);
//     setTimeout(() => { }, 1000);
// }

// // REMOVE HIGHLIGHTING ON KEYUP
// $(document).keyup(function(event) {
//     let keyUp = event.keyCode || event.which;
//     console.log(keyUp);
//     $(`#${keyUp}`).css({backgroundColor: 'rgb(0,0,0,0)'});
//     }
// );


