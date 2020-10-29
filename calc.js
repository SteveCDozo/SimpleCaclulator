const ADD = "+", SUB = "-", MULT = "×", DIV = "÷", SIGN = "+/-", EQ = "=";

// get display and button elements
var inputLine      = document.querySelector('#line4'); // should be changed to const once debugging the display lines is finished
const displayLines = document.querySelectorAll('#display p'); 
const numButtons   = document.querySelectorAll('.num-btn');
const opButtons    = document.querySelectorAll('.op-btn');
const cButton      = document.querySelector('#c-btn');
const acButton     = document.querySelector('#ac-btn');

var num1 = "", num2 = "", op = "", ans = "0";


// for debugging
const debugOp   = document.querySelector('#debug-op');
const debugAns  = document.querySelector('#debug-ans');
const debugNum1 = document.querySelector('#debug-num1');
const debugNum2 = document.querySelector('#debug-num2');


// add listeners to buttons
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
});

// all clear button clears everything on the display
acButton.addEventListener('mousedown', () => {    
    clearDisplay();
    clearMemory();
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
    if (operation == EQ) {
        // Ignore "=" if expression is not complete
        if (num1 && op && num2) {
            processExpression();
        }
    } else if (operation == SIGN) {
        processSignChange();
    } else {
        // If second number exists, process current expression, and set num1 to the answer    
        if (num2) {
            processExpression();
            num1 = ans;
            write(num1);        
        } 
        // If first number doesn't exist, bring the previous answer as num1
        else if (!num1) { 
            num1 = ans;
            write(num1);
        }
        // If op already exists, then we need to overwrite it on the display
        if (op)
            overwriteOp(operation);
        else
            write(operation);
        
        op = operation;
    }
    updateDebugInfo();
}

function processExpression() {
    ans = "";
    if (op == ADD)
        ans += (+num1) + (+num2); // using unary plus operator to convert string to number
    else if (op == SUB)
        ans += (+num1) - (+num2);
    else if (op == MULT)
        ans += (+num1) * (+num2);
    else if (op == DIV)
        ans += (+num1) / (+num2);
    else
        ans = "ERROR";

    write("=" + ans);
    advanceLines(); // Move this expression into the log now
    clearNumOp();   // Clear num and op upon processing expression, and get ready for next
}

function processSignChange() {
    // if the op is set, that means we should switch the sign of num2
    if (op) {
        if (isNegative(num2))
            num2 = num2.substring(1);
        else
            num2 = "-" + num2;
    } 
    // otherwise, switch the sign of num1 
    else  {
        if (isNegative(num1))
            num1 = num1.substring(1);
        else
            num1 = "-" + num1;        
    }
    // overwrite the inputline to reflect the sign change
    overwrite();
}

function isNegative(num) {
    return num[0] == '-';        
}

// write text to the inputline
function write(text) {
    // if the text contains html (used for negative numbers), then we have to edit innerHTML instead of innerText
    if (isNegative(num1) || isNegative(num2))
        inputLine.innerHTML += text;
    else
        inputLine.innerText += text;
}

// overwrite the inputline (used for changing the operation or sign)
function overwrite(operation = op) {
    text = formatNum(num1) + operation + formatNum(num2);

    if (isNegative(num1) || isNegative(num2))
        inputLine.innerHTML = text;
    else
        inputLine.innerText = text;
}

function formatNum(num) {
    return isNegative(num) ? '<span class="neg">-</span>' + num.substring(1) : num;
}

function advanceLines() {
    for (let x = 1; x < 4; ++x) {
        var currLine = document.querySelector('#line'+x);
        var nextLine = document.querySelector('#line'+(x+1));

        if (hasHTML(nextLine))
            currLine.innerHTML = nextLine.innerHTML;
        else
            currLine.innerText = nextLine.innerText;
    }
    inputLine.innerText = "";
}

function hasHTML(line) {
    return line.innerHTML.includes('<');
}

function clearDisplay() {
    displayLines.forEach((line) => {
        line.innerText = "";
    });
}

function clearNumOp() {
    op = "";
    num1 = "";
    num2 = "";
    updateDebugInfo();
}

function clearMemory() {
    clearNumOp();
    ans = "0";
    updateDebugInfo();
}

function updateDebugInfo() {
    debugOp.innerText   = op;
    debugAns.innerText  = ans;
    debugNum1.innerText = num1;
    debugNum2.innerText = num2;    
}