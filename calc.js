// get display and button elements
var inputLine      = document.querySelector('#line4');
const numButtons   = document.querySelectorAll('.num-btn');
const opButtons    = document.querySelectorAll('.op-btn');
const clearButtons = document.querySelectorAll('.clear-btn');

// send text to the display when buttons are clicked
numButtons.forEach(button => {
    button.addEventListener('mousedown', () => {
        inputLine.innerText += button.innerText;
    });
});

opButtons.forEach(button => {
    button.addEventListener('mousedown', () => {
        inputLine.innerText += button.innerText;
    });
});

// both clear buttons will clear the current line for now
clearButtons.forEach(button => {
    button.addEventListener('mousedown', () => {
        inputLine.innerText = "";
    });
});

// the valid keys that can be pressed on the keyboard
const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=']; //, 'Enter'];
document.addEventListener('keypress', event => {
    if (validKeys.includes(event.key))
        inputLine.innerText += event.key;
    else if (event.key == 'Enter') {
        for (let x = 1; x < 4; ++x) {
            document.querySelector('#line'+x).innerText = document.querySelector('#line'+(x+1)).innerText;
        }
        inputLine.innerText = "";
    }
});

// buttons to select the current active line on the display (for debugging purposes)
const activeLineNum = document.querySelector('#debug-line-num');
document.querySelectorAll('.line-btn').forEach(button => {
    button.addEventListener('click', () => {
        inputLine = document.querySelector('#line'+button.innerText);
        activeLineNum.innerText = button.innerText;
    });
});