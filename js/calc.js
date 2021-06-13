let todo_btn = document.querySelector('.calculator__todo-btn');
todo_btn.addEventListener('click', () => {
    let flipper = document.querySelector('.flipper');
    flipper.classList.remove('flip');
});

let btns = document.querySelectorAll('.calculator__btn');

btns.forEach(btn => {
    let audio = null;
    btn.addEventListener('click', () => {
        audio = new Audio(`../sound/${getRandomIntInclusive(1,12)}.mp3`);
        audio.play();
        calc(btn);
    })
});

let operator = null;

function calc(btn) {
    let display = document.querySelector('.calculator__current-result');
    let topNum = document.querySelector('.calculator__top-num');


    if (!isNaN(btn.textContent) && display.textContent.length <= 12) {
        display.innerHTML = display.innerHTML + btn.textContent;
    } else {

        if (display.textContent != '') {
            switch (btn.textContent) {
                case 'CE':
                    display.textContent = '';
                    topNum.textContent = '';
                    break;
                case '🠔':
                    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
                    break;
                case '±':
                    display.textContent = -Number(display.textContent);
                    break;
                case '×':
                    topNum.textContent = Number(display.textContent) + ' ×';
                    display.textContent = '';
                    operator = '*';
                    break;
                case '÷':
                    topNum.textContent = Number(display.textContent) + ' ÷';
                    display.textContent = '';
                    operator = '/';
                    break;
                case '+':
                    topNum.textContent = Number(display.textContent) + ' +';
                    display.textContent = '';
                    operator = '+';
                    break;
                case '-':
                    topNum.textContent = Number(display.textContent) + ' -';
                    display.textContent = '';
                    operator = '-';
                    break;
                case '.':
                    if (display.textContent.indexOf('.') < 0)
                        display.textContent = display.textContent + '.';
                    break;
                case '=':
                    let firstNum = Number(topNum.textContent.split(' ')[0]);
                    switch (operator) {
                        case '*':
                            display.textContent = firstNum * Number(display.textContent);
                            topNum.textContent = '';
                            break;
                        case '/':
                            if (Number(display.textContent) == 0) {
                                topNum.textContent = '';
                                display.textContent = 'Error';
                            } else {
                                display.textContent = firstNum / Number(display.textContent);
                                topNum.textContent = '';
                            }
                            break;
                        case '+':
                            display.textContent = firstNum + Number(display.textContent);
                            topNum.textContent = '';
                            break;
                        case '-':
                            display.textContent = firstNum - Number(display.textContent);
                            topNum.textContent = '';
                            break;
                    }
                    break;
            }
        }
    }

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}