const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const comment = document.getElementById('comment');
const mealContainer = document.getElementById('mealContainer');

// Search Meal (with recommendations)
searchBtn.addEventListener('click', () => {
  const mealName = searchInput.value.trim();
  fetchMeal(mealName);
});

// Dish box click -> fill search box + fetch API
document.querySelectorAll('.dish-box').forEach(box => {
  box.addEventListener('click', () => {
    const mealName = box.dataset.meal; // data-meal attribute
    searchInput.value = mealName;      // fill search input
    fetchMeal(mealName);               // fetch meal automatically
  });
});

// Unified function to fetch meal + recommendations
async function fetchMeal(mealName) {
  mealContainer.innerHTML = '';
  comment.style.opacity = 0;

  if (!mealName) {
    comment.textContent = "⚠️ Please type a meal name!";
    comment.style.opacity = 1;
    return;
  }

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    const data = await res.json();

    if (!data.meals) {
      comment.textContent = "❌ Meal not found!";
      comment.style.opacity = 1;
      return;
    }

    const meal = data.meals[0];

    // Collect ingredients
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`])
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }

    // Show main meal
    mealContainer.innerHTML = `
      <div class="meal">
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Category: ${meal.strCategory}</h3>
        <h3>Area: ${meal.strArea}</h3>
        <h3>Ingredients:</h3>
        <ul>${ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
      </div>
    `;

    // --- RECOMMENDATIONS ---
    const recommendationMeals = data.meals.filter(m => m.strMeal !== meal.strMeal);
    if (recommendationMeals.length > 0) {
      const recHTML = recommendationMeals.map(m => `
        <div class="meal recommendation">
          <h3>${m.strMeal}</h3>
          <img src="${m.strMealThumb}" alt="${m.strMeal}">
        </div>
      `).join('');
      mealContainer.innerHTML += `
        <div class="recommendation-container">
          <h2>Other Recommendations</h2>
          <div class="recommendation-grid">
            ${recHTML}
          </div>
        </div>
      `;
    }

    comment.style.opacity = 0;

  } catch (err) {
    comment.textContent = "⚠️ Error fetching meal!";
    comment.style.opacity = 1;
    console.error(err);
  }
}
