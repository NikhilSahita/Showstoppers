const searchInput = document.getElementById('search-input');
const suggestionsDropdown = document.getElementById('suggestions-dropdown');

searchInput.addEventListener('input', async (event) => {
  const searchTerm = event.target.value;
  if (searchTerm === '') {
    suggestionsDropdown.innerHTML = '';
    return;
  }

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    displaySuggestions(data.meals); 
  } catch (error) {
    console.error('Error fetching data from the MealDB API:', error);
    suggestionsDropdown.innerHTML = '<p>No meals found. Please try another search.</p>';
  }
});
function displaySuggestions(meals) {
  suggestionsDropdown.innerHTML = ''; // Clear old suggestions

  if (!meals) {
    suggestionsDropdown.innerHTML = '<p class="suggestion-item">No meals found.</p>';
    return;
  }

  // Create a suggestion item for each meal returned by the API
  meals.forEach(meal => {
    const suggestionItem = document.createElement('div');
    suggestionItem.classList.add('suggestion-item');
    suggestionItem.textContent = meal.strMeal;
    
    // Add a click handler to populate the search box
    suggestionItem.addEventListener('click', () => {
      searchInput.value = meal.strMeal;
      suggestionsDropdown.innerHTML = ''; // Hide suggestions after selection
    });
    
    suggestionsDropdown.appendChild(suggestionItem);
  });
}
