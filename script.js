document.querySelectorAll('.card[href]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    window.open(card.getAttribute('href'), '_blank', 'noopener');
  });
});

const modal = document.getElementById('emailModal');
const contactLinks = document.querySelectorAll('a[href="#contact"]');
const closeBtn = document.querySelector('.modal-close');
const contactForm = document.getElementById('contactForm');

contactLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('modal-overlay')) {
    modal.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  console.log('Form submitted:', { name, email, message });
  
  alert('Thank you for your message! I\'ll get back to you soon.');
  
  contactForm.reset();
  modal.classList.remove('active');
});



