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

// buttons to view different backgrounds (for debugging purposes)
const bgNum = document.querySelector('#bg-num');
document.querySelectorAll('#debug-bg button').forEach(button => {
    button.addEventListener('click', () => {
        var filename = "img/bg" + button.innerText + ".";
        if (button.innerText == 1)
            filename += "jpg";
        else
            filename += "png";
        document.body.style.background = `url("${filename}")`;
        bgNum.innerText = button.innerText;
    });
});