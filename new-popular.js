// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Sample show data with available images
    const showData = [
        {
            id: 'show1',
            title: 'Stranger Things',
            year: '2022',
            type: 'TV Show',
            image: './images/sthings.jpeg',
            description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
            match: '98% Match',
            rating: 'TV-14',
            duration: '3 Seasons',
            genres: ['Sci-Fi', 'Horror', 'Drama']
        },
        {
            id: 'show2',
            title: 'Money Heist',
            year: '2021',
            type: 'TV Show',
            image: './images/mh.webp',
            description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.',
            match: '95% Match',
            rating: 'TV-MA',
            duration: '5 Parts',
            genres: ['Crime', 'Drama', 'Thriller']
        },
        {
            id: 'show3',
            title: 'Dark',
            year: '2020',
            type: 'TV Show',
            image: './images/ds2.jpg',
            description: 'A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery.',
            match: '97% Match',
            rating: 'TV-MA',
            duration: '3 Seasons',
            genres: ['Sci-Fi', 'Thriller', 'Mystery']
        },
        {
            id: 'show4',
            title: 'Narcos',
            year: '2015',
            type: 'TV Show',
            image: './images/ns2.jpg',
            description: 'The true story of Colombia\'s infamously violent and powerful drug cartels.',
            match: '96% Match',
            rating: 'TV-MA',
            duration: '3 Seasons',
            genres: ['Crime', 'Drama', 'Biography']
        },
        {
            id: 'show5',
            title: 'Breaking Bad',
            year: '2008',
            type: 'TV Show',
            image: './images/bb2.jpg',
            description: 'A high school chemistry teacher turns to manufacturing and selling methamphetamine.',
            match: '99% Match',
            rating: 'TV-MA',
            duration: '5 Seasons',
            genres: ['Crime', 'Drama', 'Thriller']
        },
        {
            id: 'show6',
            title: 'House of Cards',
            year: '2013',
            type: 'TV Show',
            image: './images/hoc.jpg',
            description: 'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.',
            match: '94% Match',
            rating: 'TV-MA',
            duration: '6 Seasons',
            genres: ['Drama', 'Thriller']
        }
    ];

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

    // Add click handlers for "Add to My List" buttons
    function setupMyListButtons() {
        document.addEventListener('click', function(e) {
            if (e.target.closest('.btn-add-to-list')) {
                e.preventDefault();
                const card = e.target.closest('.showcase-card');
                const showId = card.dataset.showId;
                const show = showData.find(item => item.id === showId);
                
                if (show) {
                    const added = addToMyList(show);
                    if (added) {
                        const addButton = card.querySelector('.btn-add-to-list');
                        if (addButton) {
                            addButton.innerHTML = '<i class="fas fa-check"></i> Added';
                            addButton.classList.add('added');
                        }
                    }
                }
            }
        });
    }

    // Initialize the page
    setupMyListButtons();
    // Function to handle scroll with arrow buttons
    function setupScrollButtons() {
        // Get all scrollable sections
        const sections = document.querySelectorAll('.showcase-scroll-container');
        
        sections.forEach(section => {
            const scrollContainer = section.querySelector('.showcase-scroll');
            const prevBtn = section.querySelector('.nav-arrow.left');
            const nextBtn = section.querySelector('.nav-arrow.right');
            
            if (!scrollContainer || !prevBtn || !nextBtn) return;
            
            const card = scrollContainer.querySelector('.showcase-card');
            if (!card) return;
            
            // Calculate scroll amount (width of one card + gap)
            const cardWidth = card.offsetWidth;
            const gap = parseInt(window.getComputedStyle(scrollContainer).gap) || 0;
            const scrollAmount = cardWidth + gap;
            
            // Set up event listeners for the arrow buttons
            prevBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
            
            nextBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
            
            // Show/hide arrows based on scroll position
            const updateButtonVisibility = () => {
                const scrollLeft = scrollContainer.scrollLeft;
                const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                
                // Show/hide previous button
                if (scrollLeft > 10) {
                    prevBtn.style.display = 'flex';
                } else {
                    prevBtn.style.display = 'none';
                }
                
                // Show/hide next button
                if (scrollLeft < maxScroll - 10) {
                    nextBtn.style.display = 'flex';
                } else {
                    nextBtn.style.display = 'none';
                }
            };
            
            // Initial check
            updateButtonVisibility();
            
            // Update on scroll
            scrollContainer.addEventListener('scroll', updateButtonVisibility);
            
            // Update on window resize
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(updateButtonVisibility, 100);
            });
        });
    }
    
    // Initialize scroll buttons
    setupScrollButtons();
    
    // Add hover effect for touch devices
    function handleTouch() {
        document.body.classList.add('touch-device');
    }
    
    // Check if it's a touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        handleTouch();
    }
});
