document.addEventListener('DOMContentLoaded', () => {
    const mealNameElement = document.getElementById('myh');
    const recipeParagraph = document.querySelector('.top-right p');
    const ingredientsParagraph = document.querySelector('.bottom p');
    const mealName = mealNameElement.textContent.trim();

    // Check if a valid meal name is present.
    if (mealName && mealName !== 'Item-Name') {
        fetchMealDetails(mealName);
    } else {
        // Display an error if no meal name is provided.
        recipeParagraph.textContent = "Please provide a valid meal name in the H1 tag.";
        ingredientsParagraph.textContent = "Please provide a valid meal name in the H1 tag.";
        recipeParagraph.classList.add('show');
        ingredientsParagraph.classList.add('show');
    }

    async function fetchMealDetails(name) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
            const data = await response.json();

            // Check if the API returned a valid meal.
            if (data.meals && data.meals.length > 0) {
                const meal = data.meals[0];
                recipeParagraph.textContent = meal.strInstructions;

                let ingredientsList = '';
                for (let i = 1; i <= 20; i++) {
                    const ingredient = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (ingredient && ingredient.trim() !== '') {
                        ingredientsList += `${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}<br>`;
                    }
                }
                ingredientsParagraph.innerHTML = ingredientsList;

                // Add 'show' class for animation.
                recipeParagraph.classList.add('show');
                ingredientsParagraph.classList.add('show');
            } else {
                // This is the missing part: Display an error if no recipe is found.
                const errorMessage = `No recipe found for "${name}". Please try another meal name.`;
                recipeParagraph.textContent = errorMessage;
                ingredientsParagraph.textContent = errorMessage;
                recipeParagraph.classList.add('show');
                ingredientsParagraph.classList.add('show');
            }
        } catch (error) {
            // Handle any network or other potential fetch errors.
            const errorMessage = `There was an error fetching the recipe. Please check your network connection and try again.`;
            recipeParagraph.textContent = errorMessage;
            ingredientsParagraph.textContent = errorMessage;
            recipeParagraph.classList.add('show');
            ingredientsParagraph.classList.add('show');
            console.error('Error fetching meal details:', error);
        }
    }
});
