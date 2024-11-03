console.log("Linked")
// API
// const myHeaders = new Headers();
// myHeaders.append("x-apihub-key", "qRpABCZsUymYdltQ4uvdJwgKvBH3dmTPKVQqYi2CGAsKafLFgO");
// myHeaders.append("x-apihub-host", "AnimeList-API.allthingsdev.co");
// myHeaders.append("x-apihub-endpoint", "10b0d633-40f8-43ee-af7f-812833c933a1");

// const requestOptions = {
//    method: "GET",
//    headers: myHeaders,
//    redirect: "follow"
// };

// !async function name(params) {
    
// }

// !async function ()
// {
//     let data = await fetch("https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime?q=Naruto", requestOptions)
//         .then((response) => response.text())
//         .then((result) => 
//         { 
//             return result;
//         }
//     )
//     .catch((error) => console.error(error));

//     DisplayMovies(data);
// }();


// function DisplayMovies(dataToDisplay)
// {
//     let animeObject = JSON.parse(dataToDisplay);
//     console.log(animeObject.data);
    
//     if (Array.isArray(animeObject.data)) {
//         animeObject.data.forEach(anime => {
//             // Log the title of each anime
//             console.log(anime.title);
//             console.log(anime.images);
//         });
//     } else {
//         console.error("Data is not an array.");
//     }
// }

// API Configuration
const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "qRpABCZsUymYdltQ4uvdJwgKvBH3dmTPKVQqYi2CGAsKafLFgO");
myHeaders.append("x-apihub-host", "AnimeList-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "10b0d633-40f8-43ee-af7f-812833c933a1");

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

// Fetch Anime Data
async function fetchAnimeData() {
    try {
        const response = await fetch("https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime", requestOptions);
        const result = await response.json();
        displayAnimeCarousel(result.data);
    } catch (error) {
        console.error("Error fetching anime data:", error);
    }
}

// async function fetchAnimeData() 
//     {
//         let data = await fetch("https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime", requestOptions)
//             .then((response) => response.text())
//             .then((result) => 
//             { 
//                 return result;
//             }
//         )
//         .catch((error) => console.error(error));
    
//         DisplayMovies(data);
//     };

// function DisplayMovies(dataToDisplay)
//     {
//         let animeObject = JSON.parse(dataToDisplay);
//         // console.log(animeObject.data);
        
//         // if (Array.isArray(animeObject.data)) {
//         //     animeObject.data.forEach(anime => {
//         //         // Log the title of each anime
//         //         console.log(anime.title);
//         //         console.log(anime.images);
//         //     });
//         // } else {
//         //     console.error("Data is not an array.");
//         // }
//     }

// Display Anime Carousel with 4 images per slide and hover effect
// Function to display the anime carousel
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

            // Clickable image link to `SinglemoviePage.html`
            const imgLink = document.createElement("a");
            imgLink.href = `SinglemoviePage.html?id=${anime.mal_id}`; // Linking to the local SinglemoviePage
            imgLink.style.position = "relative";
            imgLink.style.display = "block";

            // Image element
            const img = document.createElement("img");
            img.src = anime.images.jpg.image_url;
            img.alt = anime.title;
            img.classList.add("img-fluid", "movie-fixed-size");

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
            imgLink.addEventListener("mouseenter", () => {
                titleOverlay.style.transform = "translateY(0)"; 
            });
            imgLink.addEventListener("mouseleave", () => {
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
                event.stopPropagation(); // Prevents image link navigation when clicking the button
                addToWatchlist(anime);
            });

            titleOverlay.appendChild(watchlistButton);
            imgLink.appendChild(img);
            imgLink.appendChild(titleOverlay);
            colDiv.appendChild(imgLink);
            rowDiv.appendChild(colDiv);
        }

        itemDiv.appendChild(rowDiv);
        carouselInner.appendChild(itemDiv);
    }
}

// Function to add anime to watchlist and store in localStorage
function addToWatchlist(anime) {
    const watchlist = JSON.parse(localStorage.getItem("animeWatchlist")) || [];

    if (!watchlist.some((item) => item.mal_id === anime.mal_id)) {
        watchlist.push(anime);
        localStorage.setItem("animeWatchlist", JSON.stringify(watchlist));
        console.log("Updated Watchlist:", watchlist); // Log updated watchlist
        alert(`${anime.title} added to your watchlist!`);
    } else {
        alert(`${anime.title} is already in your watchlist!`);
    }
}

// Initialize fetch and display
fetchAnimeData();


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
    
    const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase(); // Get and normalize search query
    const headings = document.querySelectorAll('h5'); 
    let found = false;

    // Loop through each h5 element to find a match
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
