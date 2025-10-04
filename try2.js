const searchBox = document.getElementById('searchBox');
const recommendationsDropdown = document.getElementById('recommendationsDropdown');

searchBox.addEventListener('input', async (event) => {
    const query = event.target.value;

    if (query.length > 2) { // Only search if query is long enough
        try {
            const response = await fetch(`/api/search?q=${query}`); // Replace with your API endpoint
            const data = await response.json();

            recommendationsDropdown.innerHTML = ''; // Clear previous recommendations

            if (data.recommendations && data.recommendations.length > 0) {
                data.recommendations.forEach(item => {
                    const recommendationItem = document.createElement('div');
                    recommendationItem.classList.add('recommendation-item');
                    recommendationItem.textContent = item.name; // Assuming 'name' is the recommendation text
                    recommendationItem.addEventListener('click', () => {
                        searchBox.value = item.name;
                        recommendationsDropdown.style.display = 'none'; // Hide dropdown after selection
                    });
                    recommendationsDropdown.appendChild(recommendationItem);
                });
                recommendationsDropdown.style.display = 'block'; // Show dropdown
            } else {
                recommendationsDropdown.style.display = 'none'; // Hide if no recommendations
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            recommendationsDropdown.style.display = 'none';
        }
    } else {
        recommendationsDropdown.style.display = 'none'; // Hide if query is too short
    }
});

// Hide dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!searchBox.contains(event.target) && !recommendationsDropdown.contains(event.target)) {
        recommendationsDropdown.style.display = 'none';
    }
});