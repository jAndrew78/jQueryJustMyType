// GLOBAL HIDE UPPER KEYBOARD ON PAGE LOAD
$('#keyboard-upper-container').hide();

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

// HIGHLIGHT KEYS IN BROWSER WHEN PRESSED ON KEYBOARD
$(document).keypress(function(event) {
    let keyPress = event.keyCode || event.which;
    console.log(keyPress);
    $(`#${keyPress}`).css({backgroundColor: 'mediumslateblue'});
    setTimeout(() => {
        $(`#${keyPress}`).css({backgroundColor: 'white'});
    }, 100);
});

// // REMOVE HIGHLIGHTING ON KEYUP
// $(document).keyup(function(event) {
//     let keyUp = event.keyCode || event.which;
//     console.log(keyUp);
//     $(`#${keyUp}`).css({backgroundColor: 'rgb(0,0,0,0)'});
//     }
// );


