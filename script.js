
const numberButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const equals = document.querySelector('.equal');
const display = document.querySelector('.display');
const pointButton = document.querySelector('.point');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const keys = document.querySelectorAll('.button');

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;
let alreadyDisplay = false;

//event Listeners
numberButtons.forEach(button => button.addEventListener('click', () => appendNumber(button.textContent)));
operatorsButtons.forEach(button => button.addEventListener('click', () => setOperation(button.textContent)));
equals.addEventListener('click', evaluate);
pointButton.addEventListener('click', () => addPoint(pointButton.textContent));
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', Delete);
window.addEventListener('keydown', setInput);
window.addEventListener('keydown', animateButton);
keys.forEach(key => key.addEventListener('transitionend', deleteClass));


function deleteClass (e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('press');
}

function animateButton (e) {  
    const key = document.querySelector(`.button[data-key="${e.key}"]`)
    if (!key) return
    key.classList.add('press');
}

function setInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        appendNumber(e.key); 
        animateButton(e);
    }
    if (e.key === ".") addPoint(e.key);
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "Backspace") Delete();
    if (e.key === "Escape") clear();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
      setOperation(convertOperator(e.key));
  }
  
  function convertOperator(keyboardOperator) {
    if (keyboardOperator === "/") return "%";
    if (keyboardOperator === "*") return "x";
    if (keyboardOperator === "-") return "-";
    if (keyboardOperator === "+") return "+";
  }
  

function Delete () {
    display.textContent =  display.textContent.slice(0,-1);
}

function clear () {
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
    shouldResetScreen = false;
    alreadyDisplay = false;
    display.textContent = 0;
}

function addPoint (point) {
    if (alreadyDisplay) return;
    display.textContent += point;
    alreadyDisplay = true;
}

function appendNumber(number) {
    if (display.textContent === "0"|| shouldResetScreen) resetScreen();
    display.textContent += number;
}

function resetScreen() {
    display.textContent = "";
    shouldResetScreen = false;
  }

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = display.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
  }

function evaluate() {

    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "%" && display.textContent === "0") {
        alert("You can't divide by 0!");
        clear();
        return;
    }

    secondOperand = display.textContent;
    display.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
    currentOperation = null;
  }

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
  }

function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch (operator) {
        case '+':
           return add(num1, num2)
            break;
        case '-':
            return subtract(num1, num2)
            break;
        case 'x':
            return multiply(num1, num2)
            break;
        case '%':
            if (num2 === 0) {
                clear();
                resetScreen();
                return;
            } else {
                return divide(num1, num2)
            }
            break;
    }
}

const add = function(num1, num2) {
    return num1 + num2;
};
  
const subtract = function(num1, num2) {
    return num1 - num2
};
  
const multiply = function(num1, num2) {
   return num1 * num2;
};

const divide = function(num1, num2) {
    return num1 / num2;
};
