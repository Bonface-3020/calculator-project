const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  const display = document.querySelector(".display");
  display.textContent = calculator.displayValue;
}

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  updateDisplay();
}

function inputDecimal(dot) {
  // If the `displayValue` does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
  updateDisplay();
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation[operator](firstOperand, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

  updateDisplay();
}

const performCalculation = {
  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
  "×": (firstOperand, secondOperand) => firstOperand * secondOperand,
  "÷": (firstOperand, secondOperand) => firstOperand / secondOperand,
  "=": (firstOperand, secondOperand) => secondOperand,
};

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  updateDisplay();
}

function toggleSign() {
  calculator.displayValue = String(parseFloat(calculator.displayValue) * -1);
  updateDisplay();
}

function handlePercentage() {
  calculator.displayValue = String(parseFloat(calculator.displayValue) / 100);
  updateDisplay();
}

function deleteLastDigit() {
  // Remove the last digit from the displayValue
  calculator.displayValue = calculator.displayValue.slice(0, -1);

  if (calculator.displayValue === "") {
    calculator.displayValue = "0";
  }

  updateDisplay();
}

const keys = document.querySelector(".buttons");
keys.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.textContent === "C") {
    resetCalculator();
    return;
  }

  if (target.textContent === "+/-") {
    toggleSign();
    return;
  }

  if (target.textContent === "%") {
    handlePercentage();
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.textContent);
    return;
  }

  if (target.textContent === ".") {
    inputDecimal(target.textContent);
    return;
  }

  if (target.textContent === "←") {
    deleteLastDigit();
    return;
  }

  inputDigit(target.textContent);
});
