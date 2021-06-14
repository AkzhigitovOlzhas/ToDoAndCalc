let todo_btn = document.querySelector('.calculator__todo-btn');
todo_btn.addEventListener('click', () => {
    let audio = new Audio('../sound/perexod.mp3');
    audio.play();
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
        if (btn.textContent == 'CE') {
            display.textContent = '';
            topNum.textContent = '';
        } else if (btn.textContent == '🠔') {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
        } else if (btn.textContent == '±') {
            display.textContent = (display.textContent == '') ? '-' : (display.textContent == '-') ? '' : -Number(display.textContent);
        } else if (btn.textContent == '.') {
            if (display.textContent.indexOf('.') < 0)
                display.textContent = display.textContent + '.';
        }

        if ((btn.textContent == '×' || btn.textContent == '÷' || btn.textContent == '+' || btn.textContent == '-') &&
            topNum.textContent != '' && display.textContent != '' && display.textContent != '-' && display.textContent != '.') {

            if (btn.textContent == '÷' && topNum.textContent.split(' ')[0] == 0) {
                topNum.textContent = '';
                display.textContent = 'Error';
                return;

            } else {
                topNum.textContent = parseResult(topNum.textContent, display.textContent, btn);
                display.textContent = '';
            }
        }

        if ((btn.textContent == '×' || btn.textContent == '÷' || btn.textContent == '+' || btn.textContent == '-') &&
            topNum.textContent == '' && display.textContent != '' && display.textContent != '-' && display.textContent != '.') {

            topNum.textContent = display.textContent + ' ' + btn.textContent;
            display.textContent = '';
        }

        if ((btn.textContent == '×' || btn.textContent == '÷' || btn.textContent == '+' || btn.textContent == '-') &&
            topNum.textContent != '' && display.textContent == '' && display.textContent != '-' && display.textContent != '.') {

            let num = topNum.textContent.split(' ')[0];
            topNum.textContent = num + ' ' + btn.textContent;
            operator = getOperator(btn.textContent);
        }

        if (btn.textContent == '=' && display.textContent != '-') {
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
        }
    }

}

function parseResult(topNum, currentNum, btn) {
    let num1 = topNum.split(' ')[0];
    let tempOperator = topNum.split(' ')[1];

    operator = getOperator(btn.textContent);

    if (tempOperator == '×') {
        return (Number(num1) * Number(currentNum)) + ' ' + btn.textContent;
    } else if (tempOperator == '÷') {
        return (Number(num1) / Number(currentNum)) + ' ' + btn.textContent;
    } else if (tempOperator == '+') {
        return (Number(num1) + Number(currentNum)) + ' ' + btn.textContent;
    } else if (tempOperator == '-') {
        return (Number(num1) - Number(currentNum)) + ' ' + btn.textContent;
    }
}

function getOperator(operator) {
    if (operator == '×') {
        return '*';
    } else if (operator == '÷') {
        return '/';
    } else if (operator == '+') {
        return '+';
    } else if (operator == '-') {
        return '-';
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}