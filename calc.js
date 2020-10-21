// get display and button elements
var inputLine      = document.querySelector('#line4'); // should be changed to const once debugging the display lines is finished
const displayLines = document.querySelectorAll('#display p'); 
const numButtons   = document.querySelectorAll('.num-btn');
const opButtons    = document.querySelectorAll('.op-btn');
const cButton      = document.querySelector('#c-btn');
const acButton     = document.querySelector('#ac-btn');

var num1 = "", num2 = "", op = "", ans = "";

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
    clearNumOp();
    updateDebugInfo();
});

// all clear button clears everything on the display
acButton.addEventListener('mousedown', () => {
    clearNumOp();
    ans = ""; // Clear memory of previous answer as well 
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
        // Ignore "=" if expression is not complete
        if (num1 && op && num2) {
            ans = processExpression();
        }
    } else if (operation == "+/-") {
        if (num2) {
            erase(num2);
            num2 = -1 * parseInt(num2);
            num2 = num2.toString();
            write(num2);
        } else if (num1 && !op) {
            erase(num1);
            num1 = -1 * parseInt(num1);
            num1 = num1.toString();
            write(num1);
        }
    } else {
        // If second number exists, process expression, and make num1 the answer
        if (num2) {
            ans = processExpression();
            // Below two lines can be deleted, as processing expression will clear num1 
            // and lead into the next if statement
            num1 = ans;
            write(num1);
        } 
        // If first number doesn't exist, bring the previous answer as num1
        if (!num1) {
            num1 = ans;
            write(num1);
        }
        op = operation;
        write(op);
    }
    // if (operation == "=") {
    //     processExpression();
    // } else {        
    //     // if there's already a second number, then first process the current expresion before overwriting op
    //     if (num2 != "") {
    //         num1 = processExpression();
    //         write(num1);
    //     }
    //     op = operation;  
    //     write(op);               
    // }
    updateDebugInfo();
}

function processExpression() {
    const ans = "ANS";
    write("="+ans);
    advanceLines();
    clearNumOp(); // Clear num and op upon processing expression, and get ready for next
    return ans;
}

function write(text) {
    inputLine.innerText += text;
}

// Erase last input from end of input line
function erase(text) {
    inputLine.innerText = inputLine.innerText.slice(0, inputLine.innerText.length - text.length);
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

// Clear num1, num2, and op
function clearNumOp() {
    op = "";
    num1 = "";
    num2 = "";
}