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
    case "Backspace":
      button = document.querySelector(".backspace");
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

decimal.addEventListener("click", (e) => {displayDecimal(e.target.textContent)});

function checkForOperator(str) {
  let operators = ["/", "*", "+", "-"];
  let containsOpe = false; 
  for(let i = 0; i < operators.length; i++) {
    if (str.includes(operators[i])) {
      containsOpe = true;
    }
  }
  return containsOpe;
}

function deleteLast() {
  let str = display.textContent;
  let lastChar = str.charAt(str.length - 1);
  if (!(checkForOperator(lastChar))) {
    display.textContent = display.textContent.slice(0, -1);
    deleteLastStoredDigit();
  }
}

function deleteLastStoredDigit() {
  if (b == "") {
    if (a != "") {
      a = a.toString().slice(0, -1);
    }
  } else {
    b = b.toString().slice(0, -1);
  }
}

let backspace = document.querySelector(".backspace");

backspace.addEventListener("click", () => {deleteLast()});

function createRipple(event) {
  let button = event.currentTarget;
  let circle = document.createElement("span");
  let diameter = Math.max(button.clientWidth, button.clientHeight);
  let radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
  circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
  circle.classList.add("ripple");
  let ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
}

btns.forEach(btn => {
  btn.addEventListener("click", createRipple);
});

opes.forEach(ope => {
  ope.addEventListener("click", createRipple);
})

equals.addEventListener("click", createRipple);

clear.addEventListener("click", createRipple);

decimal.addEventListener("click", createRipple);

backspace.addEventListener("click", createRipple);


