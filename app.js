// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-menu a');
const searchInput = document.querySelector('.search input');

// Navbar scroll effect
let lastScroll = 0;
const navbarHeight = header.offsetHeight;

// Navbar scroll handler
function handleScroll() {
  const currentScroll = window.pageYOffset;
  
  // Show/hide back to top button with smooth transition
  if (currentScroll > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  
  // Navbar scroll effect
  if (currentScroll <= 0) {
    header.classList.remove('scrolled');
    return;
  }
  
  if (currentScroll > lastScroll && currentScroll > navbarHeight) {
    // Scrolling down
    header.style.transform = `translateY(-${navbarHeight}px)`;
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  
  header.classList.add('scrolled');
  lastScroll = currentScroll;
}

// Toggle mobile menu
function toggleMenu() {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = expanded ? '' : 'hidden';
  
  // Focus management for accessibility
  if (!expanded) {
    navMenu.querySelector('a').focus();
  }
}

// Close mobile menu when clicking outside
function handleClickOutside(event) {
  if (navMenu.classList.contains('active') && 
      !event.target.closest('.nav-menu') && 
      !event.target.closest('.hamburger')) {
    closeMenu();
  }
}

// Close mobile menu
function closeMenu() {
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
  hamburger.focus();
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Close menu on Escape key
function handleEscapeKey(e) {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    closeMenu();
  }
}

// Handle keyboard navigation in the menu
function handleMenuNavigation(e) {
  if (!navMenu.classList.contains('active')) return;
  
  const { key, target } = e;
  const menuItems = Array.from(navMenu.querySelectorAll('a'));
  const currentIndex = menuItems.indexOf(target);
  
  if (key === 'ArrowDown' || key === 'ArrowRight') {
    e.preventDefault();
    const nextItem = menuItems[currentIndex + 1] || menuItems[0];
    nextItem.focus();
  } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
    e.preventDefault();
    const prevItem = menuItems[currentIndex - 1] || menuItems[menuItems.length - 1];
    prevItem.focus();
  } else if (key === 'Home') {
    e.preventDefault();
    menuItems[0].focus();
  } else if (key === 'End') {
    e.preventDefault();
    menuItems[menuItems.length - 1].focus();
  }
}

// Handle keyboard navigation for poster rows
function handleRowNavigation(e) {
  const row = e.currentTarget;
  const { key } = e;
  
  if (key === 'ArrowRight') {
    e.preventDefault();
    row.scrollBy({ left: 300, behavior: 'smooth' });
  } else if (key === 'ArrowLeft') {
    e.preventDefault();
    row.scrollBy({ left: -300, behavior: 'smooth' });
  }
}

// Initialize event listeners
function init() {
  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', handleClickOutside);
  
  // Back to top button
  if (backToTop) {
    backToTop.addEventListener('click', scrollToTop);
  }
  
  // Scroll events
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Keyboard navigation
  document.addEventListener('keydown', handleEscapeKey);
  
  // Menu keyboard navigation
  navLinks.forEach(link => {
    link.addEventListener('keydown', handleMenuNavigation);
  });
  
  // Poster rows keyboard navigation
  const rows = document.querySelectorAll('.posters, .continue-list');
  rows.forEach(row => {
    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'list');
    row.setAttribute('aria-label', 'Carousel of items');
    row.addEventListener('keydown', handleRowNavigation);
  });
  
  // Add active class to current nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
  
  // Focus trap for mobile menu
  if (navMenu) {
    const focusableElements = 'a[href], button:not([disabled]), input:not([disabled])';
    const firstFocusableElement = navMenu.querySelectorAll(focusableElements)[0];
    const focusableContent = navMenu.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];
    
    navMenu.addEventListener('keydown', (e) => {
      const isTabPressed = e.key === 'Tab';
      
      if (!isTabPressed) return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);

const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");
const video = document.getElementById("introVideo");

video.addEventListener("ended", () => {
  intro.style.transition = "opacity 1s";
  intro.style.opacity = 0;

  setTimeout(() => {
    intro.style.display = "none";
    mainContent.style.display = "block";
  }, 1000);
});