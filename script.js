document.querySelectorAll('.card[href]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    window.open(card.getAttribute('href'), '_blank', 'noopener');
  });
});

