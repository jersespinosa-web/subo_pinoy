document.addEventListener('DOMContentLoaded', () => {
  const favBtn = document.getElementById('favBtn');
  const addRecipeBtn = document.getElementById('addRecipeBtn');
  const addReviewBtn = document.getElementById('addReviewBtn');

  // Toggle favorite heart
  favBtn.addEventListener('click', () => {
    favBtn.classList.toggle('liked');
    favBtn.innerHTML = favBtn.classList.contains('liked') ? '&#9829;' : '&#9825;';
  });

  // Placeholder action for "+ Add own recipe"
  addRecipeBtn.addEventListener('click', () => {
    alert('Opening "Add Your Own Adobo Variation" form!');
  });

  // Placeholder action for "Add own review"
  addReviewBtn.addEventListener('click', () => {
    const rating = prompt('Rate this Chicken Adobo recipe (1 to 5 stars):');
    if (rating) {
      alert(`Thank you for rating Chicken Adobo ${rating}/5 stars!`);
    }
  });
});
