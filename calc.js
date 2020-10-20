// get display and button elements
var inputLine      = document.querySelector('#line4'); // should be changed to const once debugging the display lines is finished
const displayLines = document.querySelectorAll('#display p'); 
const numButtons   = document.querySelectorAll('.num-btn');
const opButtons    = document.querySelectorAll('.op-btn');
const cButton      = document.querySelector('#c-btn');
const acButton     = document.querySelector('#ac-btn');

var num1, num2, op;

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

// clear button clears the last digit/operation (entry) entered
cButton.addEventListener('mousedown', () => {
    clearEntry();
});

// all clear button clears everything on the display
acButton.addEventListener('mousedown', () => {
    clearDisplay();
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

function clearEntry() {
    // essentially removing the last entered number/operation on the input line
    if (num1 == null) 
        return;
    else if (op == null)
        inputLine.innerText = "";    
    else if (num2 == null)
        inputLine.innerText = num1;
    else
        inputLine.innerText = num1 + op;
}

function clearDisplay() {
    displayLines.forEach((line) => {
        line.innerText = "";
    });
}