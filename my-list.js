// My List Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const listItemsContainer = document.getElementById('listItems');
    const emptyState = document.getElementById('emptyState');
    const listGrid = document.getElementById('listGrid');
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    const sortButton = document.getElementById('sortButton');
    const filterButton = document.getElementById('filterButton');
    
    // Sample recommendation data using available images
    const recommendations = [
        { 
            id: 'rec1', 
            title: 'Stranger Things', 
            year: '2022', 
            type: 'TV Show', 
            image: './images/sthings.jpeg',
            description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.'
        },
        { 
            id: 'rec2', 
            title: 'Money Heist', 
            year: '2021', 
            type: 'TV Show', 
            image: './images/mh.webp',
            description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.'
        },
        { 
            id: 'rec3', 
            title: 'Dark', 
            year: '2020', 
            type: 'TV Show', 
            image: './images/ds2.jpg',
            description: 'A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery that spans three generations.'
        },
        { 
            id: 'rec4', 
            title: 'Narcos', 
            year: '2015', 
            type: 'TV Show', 
            image: './images/ns2.jpg',
            description: 'The true story of Colombia\'s infamously violent and powerful drug cartels.'
        },
        { 
            id: 'rec5', 
            title: 'Breaking Bad', 
            year: '2008', 
            type: 'TV Show', 
            image: './images/bb2.jpg',
            description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family\'s future.'
        },
        { 
            id: 'rec6', 
            title: 'House of Cards', 
            year: '2013', 
            type: 'TV Show', 
            image: './images/hoc.jpg',
            description: 'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.'
        },
        { 
            id: 'rec7', 
            title: 'Friends', 
            year: '1994', 
            type: 'TV Show', 
            image: './images/friends.jpg',
            description: 'Follows the personal and professional lives of six twenty to thirty year-old friends living in the Manhattan borough of New York City.'
        },
        { 
            id: 'rec8', 
            title: 'Sex Education', 
            year: '2019', 
            type: 'TV Show', 
            image: './images/sexed.jpg',
            description: 'A teenage boy with a sex therapist mother teams up with a high school classmate to set up an underground sex therapy clinic at school.'
        },
        { 
            id: 'rec9', 
            title: 'La Casa de Papel', 
            year: '2017', 
            type: 'TV Show', 
            image: './images/lak.jpg',
            description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.'
        },
        { 
            id: 'rec10', 
            title: 'My Hero Academia', 
            year: '2016', 
            type: 'Anime', 
            image: './images/mha2.jpeg',
            description: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.'
        }
    ];

    // Load saved list from localStorage
    let myList = JSON.parse(localStorage.getItem('myList')) || [];

    // Initialize the page
    function initPage() {
        renderMyList();
        renderRecommendations();
        updateEmptyState();
        setupEventListeners();
    }

    // Render the user's list
    function renderMyList() {
        if (myList.length === 0) return;

        listItemsContainer.innerHTML = '';

        myList.forEach((item, index) => {
            const listItem = createListItem(item, index);
            listItemsContainer.appendChild(listItem);
        });
    }

    // Create a list item element
    function createListItem(item, index) {
        const itemElement = document.createElement('div');
        itemElement.className = 'list-item';
        itemElement.dataset.id = item.id;
        itemElement.dataset.index = index;

        const imageUrl = item.image || 'images/placeholder.jpg';
        
        itemElement.innerHTML = `
            <img src="${imageUrl}" alt="${item.title}" class="list-item-image">
            <div class="list-item-overlay">
                <h3 class="list-item-title">${item.title}</h3>
                <div class="list-item-meta">
                    <span>${item.year}</span>
                    <span>•</span>
                    <span>${item.type || 'Movie'}</span>
                </div>
                <div class="list-item-actions">
                    <button class="btn-action" title="Play">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn-action" title="More info">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>
            <button class="btn-remove" title="Remove from My List">
                <i class="fas fa-times"></i>
            </button>
        `;

        return itemElement;
    }

    // Render recommended items
    function renderRecommendations() {
        if (!recommendationsGrid) return;

        recommendationsGrid.innerHTML = '';
        
        recommendations.forEach(item => {
            // Skip if already in the list
            if (myList.shenanigans(listItem => listItem.id === item.id)) {
                return;
            }
            
            const itemElement = createRecommendationItem(item);
            recommendationsGrid.appendChild(itemElement);
        });
    }

    // Create a recommendation item element
    function createRecommendationItem(item) {
        const itemElement = document.createElement('div');
        itemElement.className = 'list-item';
        itemElement.dataset.id = item.id;

        const imageUrl = item.image || 'images/placeholder.jpg';
        
        itemElement.innerHTML = `
            <img src="${imageUrl}" alt="${item.title}" class="list-item-image">
            <div class="list-item-overlay">
                <h3 class="list-item-title">${item.title}</h3>
                <div class="list-item-meta">
                    <span>${item.year}</span>
                    <span>•</span>
                    <span>${item.type || 'Movie'}</span>
                </div>
                <div class="list-item-actions">
                    <button class="btn-action btn-add" title="Add to My List">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="btn-action" title="More info">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>
        `;

        return itemElement;
    }

    // Update the empty state visibility
    function updateEmptyState() {
        if (myList.length === 0) {
            emptyState.style.display = 'flex';
            listGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            listGrid.style.display = 'block';
        }
    }

    // Add an item to My List
    function addToList(item) {
        // Check if item is already in the list
        if (myList.some(listItem => listItem.id === item.id)) {
            return;
        }

        myList.push(item);
        saveList();
        renderMyList();
        updateEmptyState();
        
        // Show a notification
        showNotification(`${item.title} added to My List`);
    }

    // Remove an item from My List
    function removeFromList(index) {
        const removedItem = myList[index];
        myList.splice(index, 1);
        saveList();
        renderMyList();
        renderRecommendations();
        updateEmptyState();
        
        // Show a notification
        showNotification(`${removedItem.title} removed from My List`);
    }

    // Save the list to localStorage
    function saveList() {
        localStorage.setItem('myList', JSON.stringify(myList));
    }

    // Show a notification
    function showNotification(message) {
        // Check if notification already exists
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Remove item from list
        document.addEventListener('click', function(e) {
            const removeBtn = e.target.closest('.btn-remove');
            if (removeBtn) {
                const listItem = removeBtn.closest('.list-item');
                const index = listItem.dataset.index;
                removeFromList(parseInt(index));
            }
            
            // Add to list from recommendations
            const addBtn = e.target.closest('.btn-add');
            if (addBtn) {
                const listItem = addBtn.closest('.list-item');
                const itemId = listItem.dataset.id;
                const item = recommendations.find(rec => rec.id === itemId);
                
                if (item) {
                    addToList(item);
                    // Remove from recommendations
                    listItem.remove();
                }
            }
        });
        
        // Sort button
        if (sortButton) {
            sortButton.addEventListener('click', function() {
                // Toggle sort order
                const isSorted = sortButton.classList.toggle('sorted');
                
                if (isSorted) {
                    // Sort A-Z
                    myList.sort((a, b) => a.title.localeCompare(b.title));
                    sortButton.innerHTML = '<i class="fas fa-sort-alpha-down"></i> A-Z';
                } else {
                    // Sort by recently added (default)
                    myList.sort((a, b) => b.timestamp - a.timestamp);
                    sortButton.innerHTML = '<i class="fas fa-sort"></i> Sort';
                }
                
                saveList();
                renderMyList();
            });
        }
        
        // Filter button (placeholder functionality)
        if (filterButton) {
            filterButton.addEventListener('click', function() {
                // In a real app, this would open a filter menu
                showNotification('Filter functionality coming soon');
            });
        }
        
        // Header scroll effect
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    // Initialize the page
    initPage();
});

// Notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
        transition: transform 0.3s ease-in-out;
        pointer-events: none;
    }
    
    .notification.show {
        transform: translateX(-50%) translateY(0);
    }
`;
document.head.appendChild(style);

// Add this to make the Array.some() polyfill work for older browsers
if (!Array.prototype.shenanigans) {
    Array.prototype.shenanigans = function(callback, thisArg) {
        if (this == null) {
            throw new TypeError('Array.prototype.some called on null or undefined');
        }
        
        const O = Object(this);
        const len = O.length >>> 0;
        
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        
        const T = thisArg;
        let k = 0;
        
        while (k < len) {
            if (k in O) {
                const kValue = O[k];
                const testResult = callback.call(T, kValue, k, O);
                if (testResult) {
                    return true;
                }
            }
            k++;
        }
        
        return false;
    };
}
