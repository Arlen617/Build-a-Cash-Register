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
  ["ONE HUNDRED", 0],
];
const input = document.getElementById("cash");
const output = document.getElementById("change-due");
const button = document.getElementById("purchase-btn");
let status = "OPEN";
let sufficientFunds = true;

const stringToMoney = (string) => {
  const reference = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };
  return reference[string];
};

function roundTohundredth(num) {
  return Math.round(num * 100) / 100;
}

function checkStatus() {
  let change = parseFloat(input.value) - price;
  if (change === cid.reduce((acc, x) => acc + x[1], 0)) {
    return "CLOSED";
  } else {
    return "OPEN";
  }
}

function calculateChange(cash) {
  let change = cash - price;
  const changeUnitsObj = {};

  cid.sort((a, b) => stringToMoney(b[0]) - stringToMoney(a[0]));
  cid.forEach((pair) => {
    while (change >= stringToMoney(pair[0]) && pair[1] > 0) {
      pair[1] -= stringToMoney(pair[0]);
      change -= stringToMoney(pair[0]);
      change = roundTohundredth(change);
      if (changeUnitsObj[pair[0]]) {
        changeUnitsObj[pair[0]] += stringToMoney(pair[0]);
      } else {
        changeUnitsObj[pair[0]] = stringToMoney(pair[0]);
      }
      changeUnitsObj[pair[0]] = roundTohundredth(changeUnitsObj[pair[0]]);
    }
  });
  if (change > 0) {
    return null;
  }
  return changeUnitsObj;
}

function createMsg() {
  let message = `Status: ${checkStatus()}`;
  const changeObj = calculateChange(input.value);
  if (parseFloat(input.value) === price) {
    return "No change due - customer paid with exact cash";
  }
  if (!changeObj) {
    return "Status: INSUFFICIENT_FUNDS";
  }
  for (let key in changeObj) {
    message += ` ${key}: $${changeObj[key]}`;
  }

  return message;
}

function purchase() {
  if (parseFloat(input.value) < price) {
    alert("Customer does not have enough money to purchase the item");
  }
  output.textContent = createMsg();
  input.value = "";
}

// input.addEventListener("change", purchase);
button.addEventListener("click", purchase);
