const display      = document.querySelector('#display');
const numButtons   = document.querySelectorAll('.num-btn');
const opButtons    = document.querySelectorAll('.op-btn');
const clearButtons = document.querySelectorAll('.clear-btn');

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

const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=', 'Enter'];
document.addEventListener('keypress', event => {
    if (validKeys.includes(event.key))
        display.innerText += event.key;
});

