// =========================================================
// Basic Calculator — vanilla JS
// Uses: event listeners, if-else statements, operators, loops
// =========================================================

class Calculator {
  constructor(previousOperandEl, currentOperandEl) {
    this.previousOperandEl = previousOperandEl;
    this.currentOperandEl = currentOperandEl;
    this.clear();
  }

  // Reset everything back to default state
  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
  }

  // Remove the last digit from the current operand
  delete() {
    if (this.currentOperand.length === 1) {
      this.currentOperand = "0";
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  // Append a digit (or first digit) to the current operand
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;

    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number;
    } else {
      this.currentOperand = this.currentOperand + number;
    }
  }

  // Convert the current value to a percentage (divide by 100)
  percent() {
    const value = parseFloat(this.currentOperand);
    if (isNaN(value)) return;
    this.currentOperand = (value / 100).toString();
  }

  // Choose +, -, ×, ÷ and "lock in" the previous operand
  chooseOperation(operation) {
    if (this.currentOperand === "" ) return;

    // If there's already a pending operation, compute it first
    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // Perform the calculation using if-else / switch on the operator
  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        result = prev + current;
        break;
      case "−":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        if (current === 0) {
          this.currentOperand = "Error";
          this.previousOperand = "";
          this.operation = undefined;
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = result.toString();
    this.operation = undefined;
    this.previousOperand = "";
  }

  // Format large numbers with comma separators using a loop
  getDisplayNumber(number) {
    if (number === "Error") return number;

    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      // Build the comma-separated string digit-group by digit-group
      const digits = Math.abs(integerDigits).toString().split("");
      let grouped = "";

      for (let i = 0; i < digits.length; i++) {
        // Insert a comma every 3 digits from the right
        const positionFromRight = digits.length - i;
        grouped += digits[i];
        if (positionFromRight > 1 && positionFromRight % 3 === 1) {
          grouped += ",";
        }
      }

      integerDisplay = (integerDigits < 0 ? "-" : "") + grouped;
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // Push the calculator's current state to the DOM
  updateDisplay() {
    this.currentOperandEl.innerText = this.getDisplayNumber(this.currentOperand);

    if (this.operation != null) {
      this.previousOperandEl.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandEl.innerText = "";
    }
  }
}

// ---------- Wire everything up ----------
const previousOperandEl = document.getElementById("previousOperand");
const currentOperandEl = document.getElementById("currentOperand");
const calculator = new Calculator(previousOperandEl, currentOperandEl);

const numberButtons = document.querySelectorAll('[data-action="number"]');
const operatorButtons = document.querySelectorAll('[data-action="operator"]');
const equalsButton = document.querySelector('[data-action="equals"]');
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const decimalButton = document.querySelector('[data-action="decimal"]');
const percentButton = document.querySelector('[data-action="percent"]');

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

decimalButton.addEventListener("click", () => {
  calculator.appendNumber(".");
  calculator.updateDisplay();
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.dataset.operator);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

percentButton.addEventListener("click", () => {
  calculator.percent();
  calculator.updateDisplay();
});

// ---------- Keyboard support ----------
window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    calculator.appendNumber(e.key);
  } else if (e.key === ".") {
    calculator.appendNumber(".");
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    const map = { "+": "+", "-": "−", "*": "×", "/": "÷" };
    calculator.chooseOperation(map[e.key]);
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculator.compute();
  } else if (e.key === "Backspace") {
    calculator.delete();
  } else if (e.key === "Escape") {
    calculator.clear();
  } else if (e.key === "%") {
    calculator.percent();
  } else {
    return;
  }

  calculator.updateDisplay();
});
