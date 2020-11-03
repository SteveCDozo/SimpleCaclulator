const ADD = "+", SUB = "-", MULT = "×", DIV = "÷", SIGN = "+/-", EQ = "=";

// get display and button elements
var inputLine      = document.querySelector('#line4');
var displayLines = document.querySelectorAll('#display p'); // change back to const after choosing a line style
var lineCount = 4;
const numButtons   = document.querySelectorAll('.num-btn');
const opButtons    = document.querySelectorAll('.op-btn');
const cButton      = document.querySelector('#c-btn');
const acButton     = document.querySelector('#ac-btn');

var num1 = "", num2 = "", op = "", ans = "0";

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
    if (validKeys.includes(event.key)) {
        write(event.key);
    } else if (event.key == 'Enter') {
        for (let x = 1; x < 4; ++x) {
            document.querySelector('#line'+x).innerText = document.querySelector('#line'+(x+1)).innerText;
        }
        inputLine.innerText = "";
    }
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
            overwrite(operation);
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

    if (lineCount == 4) {
        write("=" + ans);
        advanceLines(); // Move this expression into the log now
    } else {
        advanceLines();
        write(ans);
        advanceLines();
    }
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

function write(text) {
    var currentText = inputLine.innerText;
    inputLine.innerText = "";
    window.setTimeout(() => {
        inputLine.innerText = currentText + text;
    }, 200);
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
    for (let x = 1; x < lineCount; ++x) {
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


// for debugging
const debugOp     = document.querySelector('#debug-op');
const debugAns    = document.querySelector('#debug-ans');
const debugNum1   = document.querySelector('#debug-num1');
const debugNum2   = document.querySelector('#debug-num2');
const debugInfo   = document.querySelector("#debug-info");
const debugToggle = document.querySelector('#debug-toggle');
const display     = document.querySelector('#display');
const calculator  = document.querySelector('#calculator');
const buttonArea  = document.querySelector('#button-area');

function updateDebugInfo() {
    debugOp.innerText   = op;
    debugAns.innerText  = ans;
    debugNum1.innerText = num1;
    debugNum2.innerText = num2;    
}

// toggle the display-info panel
debugToggle.addEventListener('click', () => {
    var state = debugInfo.style.display;
    if (state === '' || state === 'block')
        debugInfo.style.display = 'none';
    else
        debugInfo.style.display = 'block';
});

// buttons to view different display styles
document.querySelectorAll('#debug-display > input').forEach(button => {
    button.addEventListener('click', () => {   
        
        clearDisplay();
        clearMemory();

        if (button.value === '1') {
            display.innerHTML = 
                `<p id="line1"></p>
                <p id="line2"></p>
                <p id="line3"></p>
                <p id="line4"></p>`;
            display.style['font-size'] = 'xxx-large';
            displayLines = document.querySelectorAll('#display p');
            lineCount = 4;
            inputLine = document.querySelector('#line4');          
        } else if (button.value === '2') {
            display.innerHTML += 
                `<p id="line5"></p>
                <p id="line6"></p>
                <p id="line7"></p>`;
            display.style['font-size'] = 'xx-large';
            displayLines = document.querySelectorAll('#display p');
            for (let x = 0; x < 7; x+=2) {
                displayLines[x].style['text-align'] = 'left';
            }
            lineCount = 7;
            inputLine = document.querySelector('#line7');
        }       
    });
});

// buttons to view different display fonts
document.querySelectorAll('#debug-font input').forEach(button => {
    button.addEventListener('click', () => {
        if (button.value === '0')
            display.style['font-family'] = 'Times New Roman';
        else
            display.style['font-family'] = 'calculatorFont'+button.value;                
    });
});

// buttons to view the different 3d effects
document.querySelectorAll('#debug-design > input').forEach(button => {
    button.addEventListener('click', () => {
        if (button.value === "0") {
            calculator.classList.remove('design-1-calc', 'design-2-calc');
            buttonArea.classList.remove('design-1', 'design-2');
        } else if (button.value === "1") {
            calculator.classList.remove('design-2-calc');
            calculator.classList.add('design-1-calc');
            buttonArea.classList.remove('design-2');            
            buttonArea.classList.add('design-1');
        } else if (button.value === "2") {
            calculator.classList.remove('design-1-calc');
            calculator.classList.add('design-2-calc');
            buttonArea.classList.remove('design-1');            
            buttonArea.classList.add('design-2');
        }
    });
});

// toggle to show/hide button borders
document.querySelector('#debug-borders input').addEventListener('click', function() {
    if (this.checked) // show borders
        buttonArea.classList.remove('no-borders');        
    else // hide borders
        buttonArea.classList.add('no-borders');    
});

// buttons to view different backgrounds
document.querySelectorAll('#debug-bg > input').forEach(button => {
    button.addEventListener('click', () => {
        var filename = "img/bg" + button.value + ".";
        if (button.value == 1)
            filename += "jpg";
        else
            filename += "png";
        document.body.style.background = `url("${filename}")`;
    });
});