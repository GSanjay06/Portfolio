// Typing animation for homepage
const typingEl = document.querySelector('.typing-effect');
if (typingEl) {
  const phrases = [
    'Web Developer',
    'Designer',
    'Creator',
    'Problem Solver'
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;
  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 600);
      } else {
        setTimeout(type, 60);
      }
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex++);
      if (charIndex > currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 1200);
      } else {
        setTimeout(type, 100);
      }
    }
  }
  setTimeout(type, 800);
}
// Theme switcher
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  });
  // Load theme from localStorage
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.innerHTML = '☀️';
  }
}
// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileMenu && navLinks) {
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close menu on link click (mobile)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}
// Smooth scroll and scroll spy
const sections = document.querySelectorAll('section');
const navLinkEls = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
  // Scroll-to-top button
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (scrollBtn) {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  }
});
navLinkEls.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});
// Scroll-to-top button
const scrollBtn = document.getElementById('scrollToTopBtn');
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    // Name validation
    if (!name) {
      setError(this.name, 'Name is required');
      valid = false;
    } else {
      setError(this.name, '');
    }
    // Email validation
    if (!email) {
      setError(this.email, 'Email is required');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(this.email, 'Enter a valid email');
      valid = false;
    } else {
      setError(this.email, '');
    }
    // Message validation
    if (!message) {
      setError(this.message, 'Message is required');
      valid = false;
    } else {
      setError(this.message, '');
    }
    if (valid) {
      // Simulate form submission
      alert('Thank you for your message!');
      this.reset();
    }
  });
  function setError(input, message) {
    const errorSpan = input.parentElement.querySelector('.error-message');
    errorSpan.textContent = message;
  }
}
// Animate on scroll (AOS.js compatibility)
function animateOnScroll() {
  const animatedEls = document.querySelectorAll('.project-card, .about-content, .skills-list, .contact-section');
  animatedEls.forEach(el => {
    if (isInViewport(el)) {
      el.classList.add('aos-animate');
    }
  });
}
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight - 60 &&
    rect.bottom > 60
  );
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll); 