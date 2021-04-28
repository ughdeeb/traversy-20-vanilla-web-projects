const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//FETCH RANDOM USER AND ADD MONEY USING ASYNC AWAIT
async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100000),
  };

  addData(newUser);
}
//DOUBLE EVERYONES MONEY
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

//SHOWS ONLY MILLIONAIRES
function showMillOnly() {
  data = data.filter((user) => user.money > 1000000);
  updateDom();
}

//SORT USERS BY RICHEST
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDom();
}

//CALCUALTE ALL MONEY
function calculateTotal() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

//ADD NEW DATA TO THE ARRAY
function addData(obj) {
  data.push(obj);
  updateDom();
}

function updateDom(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//FORMAT MONEY
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//EVENT LISTENERS
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillOnly);
calculateWealthBtn.addEventListener("click", calculateTotal);
