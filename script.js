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


function displayInput(input) {
  display.textContent += input;
}

btns.forEach(btn => {
  btn.addEventListener("click", function(e) {
    displayInput(e.target.textContent);
    storeValue(e.target.textContent);
  });
});

let a = "";
let b = "";
let whereToStore = "a";
let operator = ""

let opeBtns = document.querySelectorAll(".ope-btn");

opeBtns.forEach(opeBtn => {
  opeBtn.addEventListener("click", function(e) {
    if (b == "") {
      whereToStore = "b";
    } else {
      a = operate(operator, parseInt(a), parseInt(b));
      b = "";
      display.textContent = a + e.target.textContent;
    }
    operator = e.target.textContent;
  })
})

let equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
  if (b == "") {
    whereToStore = "b";
  } else {
    a = operate(operator, parseInt(a), parseInt(b));
    b = "";
    display.textContent = a;
  }
  operator = "";
})

function storeValue(input) {
  if (typeof parseInt(input) == "number") {
    if (whereToStore == "a") {
      a += input;
    } else if (whereToStore == "b") {
      b += input;
    }
  }
}

