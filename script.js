const input = document.getElementById("cash");
const output = document.getElementById("change-due");
const button = document.getElementById("purchase-btn");
let status = "OPEN";
let sufficientFunds = true;
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
    ["ONE HUNDRED", 100]
];




const stringToMoney = (string) => {
  const reference = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 60,
    "ONE HUNDRED": 100,
  };
  return reference[string];
};

function calculateChange(cash) {
  let change = cash - price;
  const changeUnitsObj = {};

  if (change === cid.reduce((acc, x) => acc + x[1], 0)) {
    status = "CLOSED";
  }

  cid.sort((a, b) => stringToMoney(b[0]) - stringToMoney(a[0]));
  cid.forEach((pair) => {
    while (change >= stringToMoney(pair[0]) && pair[1] > 0) {
      pair[1] -= stringToMoney(pair[0]);

      if (changeUnitsObj[pair[0]]) {
        changeUnitsObj[pair[0]] += stringToMoney(pair[0]);
      } else {
        changeUnitsObj[pair[0]] = stringToMoney(pair[0]);
      }

      change -= stringToMoney(pair[0]);
    }
  });

  if (change > 0) {
    sufficientFunds = false;
  }

  return changeUnitsObj;
}

function showMsG() {
  let message = `STATUS: ${status}`;
  if (parseFloat(input.value) === price) {
    return "No change due - customer paid with exact cash";
  }
  changeObj = calculateChange(input.value);
  console.log(typeof changeObj)
  console.log("change and units", changeObj);

  for (let key in changeObj) {
    message += ` ${key}: ${changeObj[key]}`
  };
  return message
}

button.addEventListener("click", () => {
    if (input.value < price) {
        alert("Customer does not have enough money to purchase the item");
      }
  output.textContent = showMsG();
});
