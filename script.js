function add(a, b) {
  let sum = a + b;
  return round(sum);
}

function subtract(a, b) {
  let difference = a - b;
  return round(difference);
}

function multiply(a, b) {
  let product = a * b;
  return round(product);
}

function divide(a, b) {
  if (parseInt(b) == 0) {
    alert("You can't divide by zero.");
  } else {
    let quotient = a / b;
    return round(quotient);
  }
}

function round(num) {
  return Math.round(num * 100) / 100;
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
    displayInput(this.textContent);
    storeValue(this.textContent);
  });
});

function clickButton(input) {
  let button =""
  switch(input) {
    case "+":
      button = document.querySelector(".add");
      button.click();
      break;
    case "-":
      button = document.querySelector(".subtract");
      button.click();        
      break;
    case "*":
      button = document.querySelector(".multiply");
      button.click();        
      break;
    case "/":
      button = document.querySelector(".divide");
      button.click();        
      break;
    case ".":
      button = document.querySelector(".decimal");
      button.click();        
      break;
    case "Enter":
      button = document.querySelector(".equals");
      button.click();        
      break;
    default:
      button = document.querySelector(`.b${input}`);
      button.click();
  }
}

window.addEventListener("keydown", function(e) {
  clickButton(e.key);
});

function displayInput(input) {
    display.textContent += input;
}

function storeValue(input) {
  if (typeof parseInt(input) == "number" || input == ".") {
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
      a = operate(operator, parseFloat(a), parseFloat(b));
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
    a = operate(operator, parseFloat(a), parseFloat(b)).toString();
    b = "";
    whereToStore = "a";
    display.textContent = a;
    operator = "";
  }
}

equals.addEventListener("click", () => {performCalcEq()});

let clear = document.querySelector(".clear");

function clearCalc() {
  a = "";
  b = "";
  whereToStore = "a";
  display.textContent = "";
  operator = "";
}

clear.addEventListener("click", () => {clearCalc()});

let decimal = document.querySelector(".decimal");

function displayDecimal(input) {
  if(b != "") {
    if (!(b.includes("."))) {
      displayInput(input);
      storeValue(input);
    }
  } else if (a != "") {
    if (!(a.includes("."))) {
      displayInput(input);
      storeValue(input);
    }
  }
}

decimal.addEventListener("click", (e) => {displayDecimal(e.target.textContent)})



