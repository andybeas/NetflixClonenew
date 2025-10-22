document.addEventListener('DOMContentLoaded', function() {
    // Language tabs functionality
    const languageTabs = document.querySelectorAll('.language-tab');
    const languageSections = document.querySelectorAll('.language-section');
    
    // Show 'All Languages' section by default or first available
    const defaultSection = document.querySelector('[data-lang="all"]') || languageSections[0];
    if (defaultSection) {
        defaultSection.classList.add('active');
        // Set the corresponding tab as active
        const activeTab = document.querySelector(`.language-tab[data-lang="${defaultSection.dataset.lang}"]`);
        if (activeTab) activeTab.classList.add('active');
    }
    
    // Handle tab clicks with smooth transitions
    languageTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const lang = this.dataset.lang;
            
            // Don't do anything if clicking the already active tab
            if (this.classList.contains('active')) return;
            
            // Update active tab with smooth transition
            languageTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected language section or all with smooth transitions
            if (lang === 'all') {
                languageSections.forEach(section => {
                    section.style.display = 'block';
                    // Small delay to allow display property to take effect before adding active class
                    requestAnimationFrame(() => {
                        section.classList.add('active');
                    });
                });
            } else {
                languageSections.forEach(section => {
                    if (section.dataset.lang === lang) {
                        section.style.display = 'block';
                        requestAnimationFrame(() => {
                            section.classList.add('active');
                        });
                    } else {
                        section.classList.remove('active');
                        // Wait for the fade-out animation before hiding
                        setTimeout(() => {
                            if (!section.classList.contains('active')) {
                                section.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            }
            
            // Smooth scroll to top of the section
            const section = document.querySelector(`.language-section[data-lang="${lang}"]`);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sample data for language content (in a real app, this would come from an API)
    const languageContent = {
        hindi: [
            {
                id: 'hindi1',
                title: 'Sacred Games',
                year: '2018',
                type: 'TV Show',
                image: './images/bb2.jpg',
                match: '98%',
                rating: 'TV-MA',
                duration: '2 Seasons',
                genres: ['Crime', 'Drama', 'Thriller']
            },
            // More Hindi content...
        ],
        spanish: [
            {
                id: 'spanish1',
                title: 'La Casa de Papel',
                year: '2017',
                type: 'TV Show',
                image: './images/mh.webp',
                match: '97%',
                rating: 'TV-MA',
                duration: '5 Parts',
                genres: ['Crime', 'Drama', 'Thriller']
            },
            // More Spanish content...
        ],
        korean: [
            {
                id: 'korean1',
                title: '오징어 게임',
                year: '2021',
                type: 'TV Show',
                image: './images/ns2.jpg',
                match: '99%',
                rating: 'TV-MA',
                duration: '1 Season',
                genres: ['Drama', 'Thriller', 'Action']
            },
            // More Korean content...
        ]
    };
    
    // Function to add a show to My List
    function addToMyList(show) {
        let myList = JSON.parse(localStorage.getItem('myList')) || [];
        
        // Check if show is already in the list
        if (!myList.some(item => item.id === show.id)) {
            myList.push(show);
            localStorage.setItem('myList', JSON.stringify(myList));
            showNotification(`${show.title} added to My List`);
            return true;
        } else {
            showNotification(`${show.title} is already in your list`);
            return false;
        }
    }
    
    // Function to show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }, 100);
    }
    
    // Handle "Add to My List" buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-add-to-list')) {
            e.preventDefault();
            const card = e.target.closest('.showcase-card');
            const title = card.querySelector('h3').textContent;
            const image = card.querySelector('img').src;
            
            // Create a show object to add to the list
            const show = {
                id: 'custom-' + Date.now(),
                title: title,
                image: image,
                year: new Date().getFullYear().toString(),
                type: 'Movie',
                match: '95%',
                rating: 'TV-MA',
                duration: '2h 10m',
                genres: ['Action', 'Drama']
            };
            
            const added = addToMyList(show);
            if (added) {
                const addButton = card.querySelector('.btn-add-to-list');
                if (addButton) {
                    addButton.innerHTML = '<i class="fas fa-check"></i>';
                    addButton.classList.add('added');
                }
            }
        }
    });
    
    // Initialize horizontal scrolling with improved performance
    function initHorizontalScrolling() {
        const scrollContainers = document.querySelectorAll('.showcase-scroll-container');
        
        scrollContainers.forEach(container => {
            const scrollElement = container.querySelector('.showcase-scroll');
            if (!scrollElement) return;
            
            // Add loading state
            scrollElement.classList.add('loading');
            
            // Calculate scroll amount based on card width
            const calculateScrollAmount = () => {
                const firstCard = scrollElement.querySelector('.showcase-card');
                if (!firstCard) return 300; // Fallback value
                return firstCard.offsetWidth * 2; // Scroll by 2 cards
            };
            
            // Only add navigation if content overflows
            const checkOverflow = () => {
                const hasOverflow = scrollElement.scrollWidth > scrollElement.clientWidth;
                
                if (hasOverflow && !container.querySelector('.nav-arrow')) {
                    const prevButton = document.createElement('button');
                    prevButton.className = 'nav-arrow left';
                    prevButton.innerHTML = '❮';
                    prevButton.setAttribute('aria-label', 'Scroll left');
                    
                    const nextButton = document.createElement('button');
                    nextButton.className = 'nav-arrow right';
                    nextButton.innerHTML = '❯';
                    nextButton.setAttribute('aria-label', 'Scroll right');
                    
                    container.style.position = 'relative';
                    container.insertBefore(prevButton, scrollElement);
                    container.appendChild(nextButton);
                    
                    // Handle button clicks with smooth scrolling
                    const handleScroll = (direction) => {
                        const scrollAmount = calculateScrollAmount();
                        scrollElement.scrollBy({
                            left: direction === 'next' ? scrollAmount : -scrollAmount,
                            behavior: 'smooth'
                        });
                    };
                    
                    // Touch and mouse wheel support for horizontal scrolling
                    let isDown = false;
                    let startX;
                    let scrollLeft;
                    
                    const startDragging = (e) => {
                        isDown = true;
                        startX = e.pageX || e.touches[0].pageX - scrollElement.offsetLeft;
                        scrollLeft = scrollElement.scrollLeft;
                        scrollElement.style.scrollBehavior = 'auto';
                        container.style.cursor = 'grabbing';
                    };
                    
                    const stopDragging = () => {
                        isDown = false;
                        scrollElement.style.scrollBehavior = 'smooth';
                        container.style.cursor = 'grab';
                    };
                    
                    const handleDrag = (e) => {
                        if (!isDown) return;
                        e.preventDefault();
                        const x = (e.pageX || e.touches[0].pageX - scrollElement.offsetLeft) - startX;
                        scrollElement.scrollLeft = scrollLeft - x;
                    };
                    
                    // Mouse events
                    container.addEventListener('mousedown', startDragging);
                    container.addEventListener('mouseleave', stopDragging);
                    container.addEventListener('mouseup', stopDragging);
                    container.addEventListener('mousemove', handleDrag);
                    
                    // Touch events
                    container.addEventListener('touchstart', startDragging, { passive: false });
                    container.addEventListener('touchend', stopDragging, { passive: true });
                    container.addEventListener('touchmove', handleDrag, { passive: false });
                    
                    // Mouse wheel for horizontal scrolling
                    container.addEventListener('wheel', (e) => {
                        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                            e.preventDefault();
                            scrollElement.scrollLeft += e.deltaY * 0.5;
                        }
                    }, { passive: false });
                    
                    // Button event listeners
                    prevButton.addEventListener('click', () => handleScroll('prev'));
                    nextButton.addEventListener('click', () => handleScroll('next'));
                    
                    // Update button visibility on scroll
                    const updateButtonVisibility = () => {
                        const scrollLeft = scrollElement.scrollLeft;
                        const maxScroll = scrollElement.scrollWidth - scrollElement.clientWidth;
                        
                        prevButton.style.opacity = scrollLeft > 10 ? '1' : '0';
                        nextButton.style.opacity = scrollLeft < maxScroll - 10 ? '1' : '0';
                        
                        // Hide buttons when at the edges
                        if (scrollLeft <= 10) {
                            prevButton.style.pointerEvents = 'none';
                        } else if (scrollLeft >= maxScroll - 10) {
                            nextButton.style.pointerEvents = 'none';
                        } else {
                            prevButton.style.pointerEvents = 'auto';
                            nextButton.style.pointerEvents = 'auto';
                        }
                    };
                    
                    // Throttle scroll events for better performance
                    let isScrolling;
                    scrollElement.addEventListener('scroll', () => {
                        window.clearTimeout(isScrolling);
                        isScrolling = setTimeout(updateButtonVisibility, 50);
                    }, { passive: true });
                    
                    // Initial check
                    updateButtonVisibility();
                }
                
                // Remove loading state
                scrollElement.classList.remove('loading');
            };
            
            // Initial check
            checkOverflow();
            
            // Re-check on window resize
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(checkOverflow, 100);
            });
        });
    }
    
    // Initialize the page with a small delay to ensure DOM is fully loaded
    setTimeout(() => {
        initHorizontalScrolling();
        
        // Add smooth scroll to top when clicking on logo
        const logo = document.querySelector('.navbar-logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        }
        
        // Add keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            const activeElement = document.activeElement;
            if (e.key === 'ArrowLeft' && activeElement.closest('.showcase-scroll-container')) {
                e.preventDefault();
                const container = activeElement.closest('.showcase-scroll-container');
                const scrollElement = container.querySelector('.showcase-scroll');
                if (scrollElement) {
                    scrollElement.scrollBy({
                        left: -calculateScrollAmount(),
                        behavior: 'smooth'
                    });
                }
            } else if (e.key === 'ArrowRight' && activeElement.closest('.showcase-scroll-container')) {
                e.preventDefault();
                const container = activeElement.closest('.showcase-scroll-container');
                const scrollElement = container.querySelector('.showcase-scroll');
                if (scrollElement) {
                    scrollElement.scrollBy({
                        left: calculateScrollAmount(),
                        behavior: 'smooth'
                    });
                }
            }
        });
        
        // Helper function to calculate scroll amount
        function calculateScrollAmount() {
            const firstCard = document.querySelector('.showcase-card');
            return firstCard ? firstCard.offsetWidth * 2 : 300; // Scroll by 2 cards
        }
    }, 100);
});
