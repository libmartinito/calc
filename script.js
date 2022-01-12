function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch(operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

let display = document.querySelector(".output");
let btns = document.querySelectorAll(".btn");

btns.forEach(btn => {
  btn.addEventListener("click", function(e) {
    displayInput(e.target.textContent);
    storeValue(e.target.textContent);
  });
});

function displayInput(input) {
    display.textContent += input;
}

function storeValue(input) {
  if (typeof parseInt(input) == "number") {
    if (whereToStore == "a") {
      a += input;
    } else if (whereToStore == "b") {
      b += input;
    }
  }
}

let a = "";
let b = "";
let whereToStore = "a";
let operator = ""

let opes = document.querySelectorAll(".ope");

function updateDisplay(input) {
  display.textContent = a + input;
}

function performCalcOpe(input) {
  if (a != "") {
    if (b == "") {
      whereToStore = "b";
      updateDisplay(input);
      updateOpe(input);
    } else {
      a = operate(operator, parseInt(a), parseInt(b));
      b = "";
      updateDisplay(input);
      updateOpe(input);
    }
  } 
}

function updateOpe(input) {
  operator = input;
}

opes.forEach(ope => {
  ope.addEventListener("click", function(e) {
    performCalcOpe(e.target.textContent);
  });
});

let equals = document.querySelector(".equals");

function performCalcEq() {
  if (a != "" && b != "") {
    a = operate(operator, parseInt(a), parseInt(b)).toString();
    b = "";
    whereToStore = "a";
    display.textContent = a;
    operator = "";
  }
}

equals.addEventListener("click", () => {performCalcEq()});




