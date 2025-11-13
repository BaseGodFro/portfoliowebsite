document.querySelectorAll('.card[href]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    window.open(card.getAttribute('href'), '_blank', 'noopener');
  });
});

// Modal functionality
const modal = document.getElementById('emailModal');
const contactLinks = document.querySelectorAll('a[href="#contact"]');
const closeBtn = document.querySelector('.modal-close');
const contactForm = document.getElementById('contactForm');

// Open modal when clicking contact links
contactLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
  });
});

// Close modal when clicking close button
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Close modal when clicking overlay
modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('modal-overlay')) {
    modal.classList.remove('active');
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
  }
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // TODO: Add your email service here (EmailJS, Formspree, etc.)
  // For now, just log the data
  console.log('Form submitted:', { name, email, message });
  
  // Show success message (you can customize this)
  alert('Thank you for your message! I\'ll get back to you soon.');
  
  // Reset form and close modal
  contactForm.reset();
  modal.classList.remove('active');
});



