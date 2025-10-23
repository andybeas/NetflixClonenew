// script.js
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const backToTop = document.getElementById('backToTop');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const searchInput = document.querySelector('.search input');
  const intro = document.getElementById("intro");
  const mainContent = document.getElementById("mainContent");
  const introVideo = document.getElementById("introVideo");
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  // Navbar scroll effect
  let lastScroll = 0;
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  // Navbar scroll handler
  function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Show/hide back to top button with Netflix styling
    if (currentScroll > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
    
    // Navbar background on scroll
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
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
      const firstLink = navMenu.querySelector('a');
      if (firstLink) firstLink.focus();
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
    if (hamburger) hamburger.focus();
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

  // Theme switching functionality
  function initTheme() {
    // Get saved theme from localStorage or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeText) themeText.textContent = 'Light';
    } else {
      root.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = 'Dark';
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  // Handle intro video
  function handleIntroVideo() {
    if (introVideo) {
      // Auto-hide intro video after 5 seconds if it doesn't end naturally
      const hideIntroTimeout = setTimeout(() => {
        hideIntroContent();
      }, 5000);

      // Also hide when video ends
      introVideo.addEventListener('ended', () => {
        clearTimeout(hideIntroTimeout);
        hideIntroContent();
      });

      // Skip intro on click
      intro.addEventListener('click', () => {
        clearTimeout(hideIntroTimeout);
        hideIntroContent();
      });
    } else {
      // If no video, ensure main content is visible
      mainContent.style.display = 'block';
      if (intro) intro.style.display = 'none';
    }
  }

  // Hide intro and show main content
  function hideIntroContent() {
    if (intro) {
      intro.style.transition = 'opacity 1s ease';
      intro.style.opacity = '0';
      
      setTimeout(() => {
        intro.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        
        // Trigger scroll event to set initial navbar state
        setTimeout(() => {
          window.dispatchEvent(new Event('scroll'));
        }, 100);
      }, 1000);
    }
  }

  // Add hover effects to posters
  function enhancePosters() {
    const posters = document.querySelectorAll('.posters img');
    posters.forEach(poster => {
      poster.addEventListener('mouseenter', function() {
        // Bring to front and scale
        this.style.zIndex = '10';
      });
      
      poster.addEventListener('mouseleave', function() {
        // Reset z-index after transition
        setTimeout(() => {
          this.style.zIndex = '';
        }, 300);
      });
    });
  }

  // Add click handlers to buttons
  function setupButtons() {
    const playButtons = document.querySelectorAll('.btn-play');
    const listButtons = document.querySelectorAll('.btn-list');
    
    playButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Simulate play action
        console.log('Playing content...');
        this.innerHTML = '⏸️ Playing...';
        setTimeout(() => {
          this.innerHTML = '▶ Play';
        }, 3000);
      });
    });
    
    listButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Toggle add/remove from list
        const wasAdded = this.classList.contains('added');
        if (wasAdded) {
          this.classList.remove('added');
          this.innerHTML = '+ Add to My List';
          console.log('Removed from list');
        } else {
          this.classList.add('added');
          this.innerHTML = '✓ Added to List';
          console.log('Added to list');
        }
      });
    });
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
      
      if (firstFocusableElement) {
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
    
    // Initialize intro video handling
    handleIntroVideo();
    
    // Initialize theme
    initTheme();
    
    // Theme toggle event listener
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Enhance posters with hover effects
    enhancePosters();
    
    // Setup button interactions
    setupButtons();
    
    // Search functionality
    if (searchInput) {
      searchInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      searchInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
      });
    }
  }

  // Initialize the app
  init();
});