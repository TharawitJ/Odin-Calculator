const Display = document.getElementById("showDisplay");
const numberBut = document.querySelectorAll(".NumBut");
const operatorBut = document.querySelectorAll(".Operator");
const equalToButton = document.querySelector(".EqualTo");

let currentValue = 0;
let firstNumber = 0;
let operator = null;
let secondNumber = null;
let numAfterResult = null;


clearDisplay = function() {
    currentValue = 0;
    firstNumber = 0;
    secondNumber = null;
    operator = null;
    numAfterResult = null;
    Display.textContent = currentValue;
    console.log(currentValue)
};

DisplayUpdate = function(text) {
    Display.textContent = text;
};

numberBut.forEach(Numbutton => {
    currentValue = ''
    Numbutton.addEventListener("click", () => {
        const numbervalue = Numbutton.textContent;
        currentValue += numbervalue;
        if (currentValue.length > 1 && currentValue.charAt(0) === '0' && (currentValue.charAt(1) !== '.')) {
            currentValue = currentValue.substring(1);
        }
        DisplayUpdate(currentValue);
        console.log('2c',currentValue)
        console.log('2f',firstNumber)
        console.log('2r',numAfterResult)
    })
});


operatorBut.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => {
        const operatorvalue = operatorButton.textContent;
        if (firstNumber === 0 && numAfterResult !== null && currentValue === 0) {
            firstNumber = Number(numAfterResult);
        } else if (firstNumber === 0 && numAfterResult !== null && currentValue !== 0) {
            firstNumber = Number(currentValue);
        } 
        else if (firstNumber === 0 && numAfterResult === null) {
            firstNumber = Number(currentValue);
        } 
        else if (operator) {
            secondNumber = Number(currentValue);
            firstNumber = operate(firstNumber, operator, secondNumber);
        }
        operator = operatorvalue;
        DisplayUpdate(`${firstNumber} ${operator}`);
        currentValue = 0
        console.log('3c',currentValue)
        console.log('3f',firstNumber)
        console.log('3r',numAfterResult)
    });
});

operate = function(firstNumber, operator, secondNumber) {
    switch(operator){
        case " + ":
            return firstNumber + secondNumber;
        case " - ":
            return firstNumber - secondNumber;
        case " * ":
            return firstNumber * secondNumber;
        case " / ":
            if (secondNumber === 0) {
                return "Error"
            } else {
                return firstNumber / secondNumber;
            }
        default:
            return firstNumber;
    }
};

equalToButton.addEventListener("click", () => {
    secondNumber = Number(currentValue.split(" ").pop());
    currentValue = operate(firstNumber, operator, secondNumber);
    numAfterResult = currentValue
    DisplayUpdate(numAfterResult);
    currentValue = 0
    firstNumber = 0;
    secondNumber = null;
    operator = null;
    console.log('4c',currentValue)
    console.log('4f',firstNumber)
    console.log('4r',numAfterResult)
    return numAfterResult
});
