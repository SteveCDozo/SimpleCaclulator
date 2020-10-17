var display      = document.querySelector('#display');
var numButtons   = document.querySelectorAll('.num-btn');
var opButtons    = document.querySelectorAll('.op-btn');
var clearButtons = document.querySelectorAll('.clear-btn');

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.innerText += button.innerText;
    });
});

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.innerText += button.innerText;
    });
});

clearButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.innerText = "";
    });
});

