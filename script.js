let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
const input = document.getElementById("cash");
const output = document.getElementById("change-due");
const button = document.getElementById("purchase-btn");

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
  let change = (cash - price) * 100;
  let changeUnitsObj = {};

  cid.sort((a, b) => stringToCents(b[0]) - stringToCents(a[0]));

  cid = cid.map((arr) => [arr[0], arr[1] * 100]);
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

  return changeUnitsObj;
}

function createMsg() {
  let message = `Status: ${checkStatus()}`;
  const changeObj = calculateChange(parseFloat(input.value));
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
