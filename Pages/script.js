console.log("Linked")

// API 
const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "qRpABCZsUymYdltQ4uvdJwgKvBH3dmTPKVQqYi2CGAsKafLFgO");
myHeaders.append("x-apihub-host", "AnimeList-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "10b0d633-40f8-43ee-af7f-812833c933a1");

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};


async function fetchAnimeData() {
    try {
        const response = await fetch("https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime", requestOptions);
        const result = await response.json();
        displayAnimeCarousel(result.data);
    } catch (error) {
        console.error("Error fetching anime data:", error);
    }
}

// Display 4 images per slide
function displayAnimeCarousel(animeList) {
    const carouselInner = document.getElementById("animeCarouselInner");
    for (let i = 0; i < animeList.length; i += 4) {
        
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("carousel-item");
        if (i === 0) itemDiv.classList.add("active"); 

        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row", "text-center"); 

        for (let j = i; j < i + 4 && j < animeList.length; j++) {
            const anime = animeList[j];

            // Column div
            const colDiv = document.createElement("div");
            colDiv.classList.add("col-3", "position-relative");

            // Image element
            const img = document.createElement("img");
            img.src = anime.images.jpg.image_url;
            img.alt = anime.title;
            img.classList.add("img-fluid", "movie-fixed-size");
            img.style.cursor = "pointer";
            
            // Navigate to SinglemoviePage on image click
            img.addEventListener("click", () => {
                window.location.href = `SinglemoviePage.html?id=${anime.mal_id}`;
            });

            // Overlay for title and button, initially hidden
            const titleOverlay = document.createElement("div");
            titleOverlay.classList.add("popup-info");
            titleOverlay.style.position = "absolute";
            titleOverlay.style.bottom = "0";
            titleOverlay.style.left = "0";
            titleOverlay.style.width = "100%";
            titleOverlay.style.background = "rgba(0, 0, 0, 0.7)";
            titleOverlay.style.color = "white";
            titleOverlay.style.padding = "10px";
            titleOverlay.style.textAlign = "center";
            titleOverlay.style.transform = "translateY(100%)"; 
            titleOverlay.style.transition = "transform 0.3s ease-in-out";

            // Hover effect to show overlay
            colDiv.addEventListener("mouseenter", () => {
                titleOverlay.style.transform = "translateY(0)"; 
            });
            colDiv.addEventListener("mouseleave", () => {
                titleOverlay.style.transform = "translateY(100%)"; 
            });

            // Anime title and watchlist button in overlay
            titleOverlay.innerHTML = `<h5>${anime.title}</h5>`;
            const watchlistButton = document.createElement("button");
            watchlistButton.textContent = "Add to Watchlist";
            watchlistButton.style.backgroundColor = "#ff6600";
            watchlistButton.style.color = "white";
            watchlistButton.style.border = "none";
            watchlistButton.style.padding = "5px 10px";
            watchlistButton.style.marginTop = "10px";
            watchlistButton.style.cursor = "pointer";
            watchlistButton.style.borderRadius = "3px";

            // Add to watchlist button
            watchlistButton.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevents image click navigation when clicking the button
                addToWatchlist(anime);
            });

            titleOverlay.appendChild(watchlistButton);
            colDiv.appendChild(img);
            colDiv.appendChild(titleOverlay);
            rowDiv.appendChild(colDiv);
        }

        itemDiv.appendChild(rowDiv);
        carouselInner.appendChild(itemDiv);
    }
}

// add to watchlist and store in localStorage
function addToWatchlist(anime) {
    const watchlist = JSON.parse(localStorage.getItem("animeWatchlist")) || [];

    if (!watchlist.some((item) => item.mal_id === anime.mal_id)) {
        watchlist.push(anime);
        localStorage.setItem("animeWatchlist", JSON.stringify(watchlist));
        
        console.log(`Anime added to watchlist: ${anime.title}`);
        console.log("Updated Watchlist:", watchlist); 
        
        alert(`${anime.title} added to your watchlist!`);
    } else {
        console.log(`Anime already in watchlist: ${anime.title}`);
        alert(`${anime.title} is already in your watchlist!`);
    }
}

fetchAnimeData();

//Watchlist code

// display the watchlist from localStorage
function displayWatchlist() {
    const watchlistContainer = document.getElementById("watchlistContainer");
    const watchlistCount = document.getElementById("watchlistCount");
    const watchlist = JSON.parse(localStorage.getItem("animeWatchlist")) || [];

    // Clear the current contents of the watchlist container
    watchlistContainer.innerHTML = '';

    // Update the watchlist count
    watchlistCount.textContent = `Total saved: ${watchlist.length} items`;

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<p>Your watchlist is empty!</p>';
        return;
    }

    watchlist.forEach(anime => {
        const animeDiv = document.createElement("div");
        animeDiv.classList.add("anime-item", "d-flex", "flex-column", "justify-content-between");
    
        const animeTitle = document.createElement("h5");
        animeTitle.textContent = anime.title;
    
        const animeImg = document.createElement("img");
        animeImg.src = anime.images.jpg.image_url;
        animeImg.alt = anime.title;
        animeImg.classList.add("anime-thumbnail");
    
        animeImg.addEventListener("click", () => {
            window.location.href = `SinglemoviePage.html?id=${anime.mal_id}`;
        });
    
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button", "mt-auto");
    
        removeButton.addEventListener("click", () => {
            removeFromWatchlist(anime.mal_id);
        });
    
        animeDiv.appendChild(animeImg);
        animeDiv.appendChild(animeTitle);
        animeDiv.appendChild(removeButton);
        watchlistContainer.appendChild(animeDiv);
    
    });
}

// remove an anime from the watchlist
function removeFromWatchlist(animeId) {
    let watchlist = JSON.parse(localStorage.getItem("animeWatchlist")) || [];

    // Filter out the anime with the specified ID
    watchlist = watchlist.filter(anime => anime.mal_id !== animeId);

    // Update localStorage with the modified watchlist
    localStorage.setItem("animeWatchlist", JSON.stringify(watchlist));

    // Re-display the watchlist with updated data
    displayWatchlist();
}

// display of watchlist when page loads
document.addEventListener("DOMContentLoaded", displayWatchlist);



// Home page and search 

// form submission
document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const emailInput = document.getElementById('email-input').value;
    
    if (emailInput) {
      
        localStorage.setItem('subscribedEmail', emailInput);
        
        alert('Successfully subscribed!');
        window.location.href = '#';
        
        document.getElementById('email-input').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// searching and scrolling 
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase(); 
    const headings = document.querySelectorAll('h5'); 
    let found = false;

    // Loop each h5 element to find a match
    headings.forEach((heading) => {
        if (heading.textContent.toLowerCase().includes(searchQuery)) {
            heading.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
            heading.style.backgroundColor = '#ffff99'; 
            found = true;

            
            setTimeout(() => {
                heading.style.backgroundColor = '';
            }, 10);
        }
    });

    if (!found) {
        alert('No matching results found');
    }
});

// Sign up and in

document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.forms['signUp'];
    const signInForm = document.forms['signIn'];

    if (signUpForm) {
        signUpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = signUpForm['email'].value;
            const password = signUpForm['password'].value;
            const confirmPassword = signUpForm['cnfm'].value;
            const username = signUpForm['username'].value; 

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            localStorage.setItem('username', username); 
            alert('Sign up successful!');
            window.location.href = 'signin.html'; 
        });
    }

    if (signInForm) {
        signInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = signInForm['email'].value;
            const password = signInForm['password'].value;

            const storedEmail = localStorage.getItem('userEmail');
            const storedPassword = localStorage.getItem('userPassword');

            if (email === storedEmail && password === storedPassword) {
                alert('Sign in successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password!');
            }

            
        });
    }
});

