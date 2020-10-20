// get display and button elements
var inputLine      = document.querySelector('#line4'); // should be changed to const once debugging the display lines is finished
const displayLines = document.querySelectorAll('#display p'); 
const numButtons   = document.querySelectorAll('.num-btn');
const opButtons    = document.querySelectorAll('.op-btn');
const cButton      = document.querySelector('#c-btn');
const acButton     = document.querySelector('#ac-btn');

var num1 = "", num2 = "", op = "";

// for debugging
const debugOp   = document.querySelector('#debug-op');
const debugNum1 = document.querySelector('#debug-num1');
const debugNum2 = document.querySelector('#debug-num2');


// send text to the display when buttons are clicked
numButtons.forEach(button => {
    button.addEventListener('mousedown', () => {
        processNum(button.innerText);
    });
});

opButtons.forEach(button => {
    button.addEventListener('mousedown', () => {
        processOp(button.innerText);
    });
});

// clear button will clear the current line for now
cButton.addEventListener('mousedown', () => {
    inputLine.innerText = "";
    updateDebugInfo();
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

function clearDisplay() {
    displayLines.forEach((line) => {
        line.innerText = "";
    });
    updateDebugInfo();
}

function processNum(digit) {
    write(digit);
    // if an operation is already registered, then this digit is part of the second number
    // otherwise it is part of the first number
    if (op == "")
        num1 += digit;
    else
        num2 += digit;
    updateDebugInfo();
}

function processOp(operation) {
    if (operation == "=") {
        processExpression();
    } else {        
        // if there's already a second number, then first process the current expresion before overwriting op
        if (num2 != "") {
            num1 = processExpression();
            write(num1);
        }
        op = operation;  
        write(op);               
    }
    updateDebugInfo();
}

function processExpression() {
    const ans = "ANS";
    write("="+ans);
    advanceLines();
    op = "";
    num1 = "";
    num2 = "";    
    return ans;
}

function write(text) {
    inputLine.innerText += text;
}

function advanceLines() {
    for (let x = 1; x < 4; ++x) {
        document.querySelector('#line'+x).innerText = document.querySelector('#line'+(x+1)).innerText;
    }
    inputLine.innerText = "";
}

function updateDebugInfo() {
    debugOp.innerText   = op;
    debugNum1.innerText = num1;
    debugNum2.innerText = num2;
}