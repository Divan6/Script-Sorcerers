// script.js


document.getElementById('searchButton').addEventListener('click', function(event) {
    
    event.preventDefault();

    // Get the search query entered 
    const searchQuery = document.getElementById('searchQuery').value.trim().toLowerCase();

    // Define an object 
    const searchResults = {
        'jujutsu kaisen': '#jujutsu kaisen',
        'demon slayer': '#products',
        'newly releases': '#products',
        'blossoms of fate': '#gameCarousel', 
        'samurai’s echo': '#gameCarousel', 
        'koi legends': '#gameCarousel', 
        'home': 'index.html',  
        'about': 'about.html', 
        'contact': 'contact.html', 
        'help': 'help.html' 
    };

    // Check if the search query matches any of the defined search terms
    if (searchResults[searchQuery]) {
        // scroll to that section
        if (searchResults[searchQuery].startsWith('#')) {
            document.querySelector(searchResults[searchQuery]).scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = searchResults[searchQuery];
        }
    } else {
        alert('No results found for: ' + searchQuery);
    }
});


// dropdown elements
const animeLink = document.getElementById('animeLink');
const animeDropdown = document.getElementById('animeDropdown');

// Anime link is clicked
animeLink.addEventListener('click', function(event) {
    
    event.preventDefault();
    
    // Toggle dropdown menu
    animeDropdown.classList.toggle('show');
});

// clicking outside of it
document.addEventListener('click', function(event) {
    if (!animeLink.contains(event.target) && !animeDropdown.contains(event.target)) {
        animeDropdown.classList.remove('show');
    }
});


 // form submit event
 const form = document.getElementById('subscribeForm');

 form.addEventListener('submit', function(event) {

     event.preventDefault();

     alert('Subscribed successfully!');
     window.location.href = 'home.html';
 });