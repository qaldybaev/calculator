class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.clearDisplay();
    }

    appendNumber(num) {
        this.displayElement.value += num;
    }

    appendOperator(operator) {
        const res = this.displayElement.value.slice(-1);
        if ("+-*/%".includes(res)) {
            this.displayElement.value = this.displayElement.value.slice(0, -1) + operator;
        } else {
            this.displayElement.value += operator;
        }
    }

    clearDisplay() {
        this.displayElement.value = '';
    }

    backspace() {
        this.displayElement.value = this.displayElement.value.slice(0, -1);
    }

    calculateResult() {
        try {
            let expression = this.displayElement.value.replace(/%/g, "/100");
            const result = new Function('return ' + expression)();
            this.displayElement.value = result;
        } catch (error) {
            this.displayElement.value = "error!";
        }
    }
}

const display = document.getElementById("display");
const calculator = new Calculator(display);

document.querySelector(".backspace").addEventListener("click", () => calculator.backspace());

document.querySelectorAll(".son").forEach(button => {
    button.addEventListener("click", () => calculator.appendNumber(button.innerText));
});

document.querySelectorAll(".operator, .foiz").forEach(button => {
    button.addEventListener("click", () => calculator.appendOperator(button.innerText));
});

document.querySelector(".delete").addEventListener("click", () => calculator.clearDisplay());
document.querySelector(".enter").addEventListener("click", () => calculator.calculateResult());


document.addEventListener("keydown", function (event) {
    const allowedKeys = "0123456789+-*/.%";
    if (allowedKeys.includes(event.key)) {
        calculator.appendNumber(event.key);
    } else if (event.key === "Enter") {
        calculator.calculateResult();
    } else if (event.key === "Backspace") {
        calculator.backspace();
    } else if (event.key === "Escape") {
        calculator.clearDisplay();
    }
});
