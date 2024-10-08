let price = 19.5;
let cid = [
  ["PENNY", 0.5], 
  ["NICKEL", 0], 
  ["DIME", 0], 
  ["QUARTER", 0], 
  ["ONE", 0], 
  ["FIVE", 0], 
  ["TEN", 0], 
  ["TWENTY", 0], 
  ["ONE HUNDRED", 0]
];
const input = document.getElementById("cash");
const output = document.getElementById("change-due");
const button = document.getElementById("purchase-btn");
const keypadElements = document.querySelectorAll(".numkey");
const clearBtn = document.querySelector(".clear");
const backspaceBtn = document.querySelector(".backspace");
for (let el of keypadElements) {
  el.onclick = () => {
    input.value += el.textContent;
  };
}

backspaceBtn.addEventListener("click", () => {
  input.value = input.value.slice(0, input.value.length - 1);
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  output.innerHTML = "";
});

const stringToCents = (string) => {
  const reference = {
    PENNY: 1,
    NICKEL: 5,
    DIME: 10,
    QUARTER: 25,
    ONE: 100,
    FIVE: 500,
    TEN: 1000,
    TWENTY: 2000,
    "ONE HUNDRED": 10000,
  };
  return reference[string];
};

function checkStatus() {
  let change = parseFloat(input.value) - price;
  if (change === cid.reduce((acc, x) => acc + x[1], 0)) {
    return "CLOSED";
  } else {
    return "OPEN";
  }
}

function calculateChange(cash) {
  let change = Math.round((cash - price) * 100);
  let changeUnitsObj = {};
  cid.sort((a, b) => stringToCents(b[0]) - stringToCents(a[0]));
  cid = cid.map((arr) => [arr[0], Math.round(arr[1] * 100)]);
  cid.forEach((pair) => {
    while (change >= stringToCents(pair[0]) && pair[1] > 0) {
      pair[1] -= stringToCents(pair[0]);
      change -= stringToCents(pair[0]);
      if (changeUnitsObj[pair[0]]) {
        changeUnitsObj[pair[0]] += stringToCents(pair[0]);
      } else {
        changeUnitsObj[pair[0]] = stringToCents(pair[0]);
      }
    }
  });
  if (change > 0) {
    return null;
  }

  for (let key in changeUnitsObj) {
    changeUnitsObj[key] = changeUnitsObj[key] / 100;
  }
  cid = cid.map((arr) => [arr[0], arr[1] / 100]);
  return changeUnitsObj;
}

function createMsg() {
  let message = `Status: ${checkStatus()}<br>`;
  const changeObj = calculateChange(parseFloat(input.value));
  if (parseFloat(input.value) === price) {
    return "No change due - customer paid with exact cash";
  }
  if (!changeObj) {
    return "Status: INSUFFICIENT_FUNDS";
  }
  for (let key in changeObj) {
    message += ` ${key}: $${changeObj[key]}<br>`;
  }

  return message;
}

function purchase() {
  if (parseFloat(input.value) < price) {
    alert("Customer does not have enough money to purchase the item");
  }
  output.innerHTML = createMsg();
  input.value = "";
}

// input.addEventListener("change", purchase);
button.addEventListener("click", purchase);
