// Scroll Animations - Repeat on every scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Remove visible class when element leaves viewport so animation can replay
      entry.target.classList.remove('visible');
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Lightbox/Gallery Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxInfo = document.getElementById('lightboxInfo');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let images = [];

// Collect all project images
function initGallery() {
  const cards = document.querySelectorAll('.card[data-image]');
  images = Array.from(cards).map(card => ({
    image: card.getAttribute('data-image'),
    title: card.getAttribute('data-title'),
    subtitle: card.getAttribute('data-subtitle'),
    href: card.getAttribute('href')
  }));
}

// Open lightbox
function openLightbox(index) {
  if (images.length === 0) return;
  currentImageIndex = index;
  updateLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Update lightbox image
function updateLightboxImage() {
  const current = images[currentImageIndex];
  lightboxImage.src = current.image;
  lightboxImage.alt = current.title;
  lightboxInfo.textContent = `${current.title} • ${current.subtitle}`;
  
  // Show/hide navigation buttons
  lightboxPrev.style.display = images.length > 1 ? 'flex' : 'none';
  lightboxNext.style.display = images.length > 1 ? 'flex' : 'none';
}

// Navigate to previous image
function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateLightboxImage();
}

// Navigate to next image
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateLightboxImage();
}

// Initialize gallery
initGallery();

// Add expand button and handlers to cards with images
document.querySelectorAll('.card[data-image]').forEach((card, index) => {
  const cardImage = card.querySelector('img');
  const href = card.getAttribute('href');
  
  // Create expand button for lightbox
  const expandBtn = document.createElement('button');
  expandBtn.className = 'card-expand';
  expandBtn.innerHTML = '⤢';
  expandBtn.setAttribute('aria-label', 'View fullscreen');
  expandBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openLightbox(index);
  });
  card.appendChild(expandBtn);
  
  // Restore original behavior: clicking card opens PDF/link
  card.style.cursor = 'pointer';
  card.addEventListener('click', (e) => {
    // Don't interfere if clicking the expand button
    if (e.target === expandBtn || e.target.closest('.card-expand')) {
      return;
    }
    // For PDFs and external links, open in new tab
    if (href && (href.endsWith('.pdf') || href.startsWith('http'))) {
      e.preventDefault();
      window.open(href, '_blank', 'noopener');
    }
    // For other links, let default behavior happen
  });
});

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);

// Close on overlay click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  }
});

// Legacy modal code (keeping for compatibility)
const modal = document.getElementById('emailModal');
const contactLinks = document.querySelectorAll('a[href="#contact"]');
const closeBtn = document.querySelector('.modal-close');
const contactForm = document.getElementById('contactForm');

if (modal && contactLinks.length > 0) {
  contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
      modal.classList.remove('active');
    }
  });
}

if (contactForm) {
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
}
