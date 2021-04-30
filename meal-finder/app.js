const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

//SEARCH MEAL AND FETCH FROM API FUNCTION
function searchMeal(e) {
  e.preventDefault();

  //Clear single meal
  single_mealEl.innerHTML = "";

  //Get search term
  const term = search.value;
  console.log(term);

  //Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2> Search results for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML =
            "There are no search results. You must ask the right questions. Please try again.";
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class ="meal"> 
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                  <div class = "meal-info" data-mealID="${meal.idMeal}">  
                  <h3>${meal.strMeal}</h3>
                  </div>
              </div>`
            )
            .join("");
        }
      });
    //CLEAR SEARCHTEXT
    search.value = "";
  } else {
    alert("Please enter search term");
  }
}

//Fetch Meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}
`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

//FETCH RANDOM MEAL FROM API
function getRandomMeal(rando) {
  //clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php
`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

//ADD MEAL TO DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredients${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `<div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src = "${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class = "single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2> Ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
      </ul>
    </div>
  </div>`;
}

//EVENT LISTENERS

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
