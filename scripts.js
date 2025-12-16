class Calculator {
    constructor() {
        this.firstNumber = NaN;
        this.secondNumber = NaN;
        this.currentOperation = undefined;
        this.result = NaN;
    }

    addition() {
        this.result = this.firstNumber + this.secondNumber;
    }

    substraction() {
        this.result =  this.firstNumber - this.secondNumber;
    }

    multiplication() {
        this.result = this.firstNumber * this.secondNumber;
    }

    division() {
        if (this.secondNumber == 0)
            this.result = NaN;
        else
            this.result = this.firstNumber / this.secondNumber;
    }

    calculate() {
        switch (this.currentOperation) {
            case "+":
                this.addition();
                break;
            case "-":
                this.substraction();
                break;
            case "*":
                this.multiplication();
                break;
            case "/":
                this.division();
                break;
        }
    }

    resetCalculator() {
        this.firstNumber = NaN;
        this.secondNumber = NaN;
        this.currentOperation = undefined;
        this.result = NaN;
    }
}

//Creation and retrieval of the elements necessary for the calculator to work
let calculator = new Calculator();

let showCalcul = document.getElementById("showCalcul");

//Creation of the necessary functions for the calculator to work
function addElementToCalcul(element) {
    if (showCalcul.innerText == "NaN")
        clearCalcul();

    showCalcul.innerText += element;
}

function getLastElementFromCalcul() {
    const currentCalcul = showCalcul.innerText;
    const calculLength = currentCalcul.length;
    return currentCalcul.charAt(calculLength - 1);
}

function removeElementFromCalcul() {
    const currentCalcul = showCalcul.innerText;
    const calculLength = currentCalcul.length;
    const lastElement = currentCalcul.charAt(calculLength - 1);

    if (lastElement == calculator.currentOperation)
        calculator.currentOperation = undefined;

    showCalcul.innerText = currentCalcul.slice(0, calculLength - 1);
}

function clearCalcul() {
    showCalcul.innerText = "";
    calculator.resetCalculator();
}

function addOperation(operation) {
    const lastElement = getLastElementFromCalcul();

    if (lastElement == "" || lastElement == "-") //If there's no number in the calculator, nothing happens
        return;
                            
    const currentOperation = calculator.currentOperation;

    if (currentOperation != undefined)
        if (lastElement != currentOperation) //If there's already an operation in the calculator and the last element is a number, nothing happens
            return;
    else removeElementFromCalcul();

    addElementToCalcul(operation);
    calculator.currentOperation = operation;
}

function addNegationOrSubstraction() {
    const lastElement = getLastElementFromCalcul();
    const currentOperation = calculator.currentOperation;

    if (currentOperation == undefined) {
        if (lastElement != "") //If there's no operation in the calculator and a number has been inserted, the operation become a substraction
            calculator.currentOperation = "-";

        addElementToCalcul("-");
    }
    else {
        if (lastElement == currentOperation) //If there's an operation in the calculator, a negation is inserted only if there's no number added yet
            addElementToCalcul("-");
    }
}

function extractNumbersAndCalculate() {
    const currentOperation = calculator.currentOperation;

    if (currentOperation == undefined || getLastElementFromCalcul() == currentOperation)
        return;

    const currentCalcul = showCalcul.innerText;
    const calculLength = currentCalcul.length;
    const operationIndex = currentCalcul.indexOf(currentOperation, 1); //I start the search at index 1 because the first element will never be an operation and like this I don't encounter an error if the first element is a negation

    const firstNumber = currentCalcul.substring(0, operationIndex);
    calculator.firstNumber = Number(firstNumber);

    const secondNumber = currentCalcul.substring(operationIndex + 1, calculLength);
    calculator.secondNumber = Number(secondNumber);

    calculator.calculate();
    showCalcul.innerText = calculator.result;
    calculator.resetCalculator();
}