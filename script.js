document.addEventListener('DOMContentLoaded', () => {
    const cardLinks = document.querySelectorAll('.card-link');
  
    cardLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        // 1. Prevent the default action (navigation) immediately.
        event.preventDefault();
  
        // 2. Get the card name from the data attribute.
        const cardName = event.currentTarget.dataset.cardName;
  
        // 3. Set the item in localStorage.
        localStorage.setItem('lastClickedCard', cardName);
  
        // 4. Redirect the user only after setting localStorage.
        window.location.href = event.currentTarget.href;
      });
    });
  });
  