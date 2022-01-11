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
  if (input != "=") {
    display.textContent += input;
  }
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

function performOpe(input) {
  if (b == "") {
    whereToStore = "b";
    displayInput(input);
  } else {
    a = operate(operator, parseInt(a), parseInt(b));
    b = "";
    updateDisplay(input);
  }
  updateOpe(input);
}

function updateDisplay(input) {
  if (input != "=") {
    display.textContent = a + input;
  } else {
    display.textContent = a;
  }
}

function updateOpe(input) {
  if (input != "=") {
    operator = input;
  } else {
    operator = "";
  }
}

opes.forEach(ope => {
  ope.addEventListener("click", function(e) {
    performOpe(e.target.textContent);
  })
})


