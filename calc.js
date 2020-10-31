// get display and button elements
const inputLine    = document.querySelector('#line4');
const displayLines = document.querySelectorAll('#display p'); 
const numButtons   = document.querySelectorAll('.num-btn');
const opButtons    = document.querySelectorAll('.op-btn');
const cButton      = document.querySelector('#c-btn');
const acButton     = document.querySelector('#ac-btn');


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

// clear button will clear the current line for now
cButton.addEventListener('mousedown', () => {
    inputLine.innerText = "";
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

function clearDisplay() {
    displayLines.forEach((line) => {
        line.innerText = "";
    });
}

// temporary button to remove/add borders (for viewing different calculator looks)
const borderButton = document.querySelector('#border-test');
borderButton.addEventListener('click', () => {
    if (borderButton.innerText == "no border") {
        document.querySelectorAll('.design-1 .clear-btn').forEach(button => {
            button.style['border-color'] = "#B77587";
        });
        document.querySelectorAll('.design-1 .op-btn').forEach(button => {
            button.style['border-color'] = "darkgray";
        });
        document.querySelectorAll('.design-1 .num-btn').forEach(button => {
            button.style['border-color'] = "#2e2d2c";
        });
        borderButton.innerText = "add border";
    } else {
        document.querySelectorAll('.design-1 button').forEach(button => {
            button.style['border-color'] = "gray";
        });
        borderButton.innerText = "no border";
    }
});

// temporary buttons to view the 3d effect (for viewing different calculator looks)
document.querySelectorAll('.look-btn').forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText == "2d") {
            document.querySelector('#calculator').className = '';
            document.querySelector('#button-area').className = '';
        } else if (button.innerText == "3d-1") {
            document.querySelector('#calculator').className = 'design-1-calc';
            document.querySelector('#button-area').className = 'design-1';
        } else if (button.innerText == "3d-2") {
            document.querySelector('#calculator').className = 'design-2-calc';
            document.querySelector('#button-area').className = 'design-2';
        }
    });
});
