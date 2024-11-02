console.log("Linked")
// API TEST
const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "qRpABCZsUymYdltQ4uvdJwgKvBH3dmTPKVQqYi2CGAsKafLFgO");
myHeaders.append("x-apihub-host", "AnimeList-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "10b0d633-40f8-43ee-af7f-812833c933a1");

const requestOptions = {
   method: "GET",
   headers: myHeaders,
   redirect: "follow"
};

!async function name(params) {
    
}

!async function ()
{
    let data = await fetch("https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime", requestOptions)
        .then((response) => response.text())
        .then((result) => 
        { 
            return result;
        }
    )
    .catch((error) => console.error(error));

    DisplayMovies(data);
}();


function DisplayMovies(dataToDisplay)
{
    let animeObject = JSON.parse(dataToDisplay);
    console.log(animeObject.data);
    
    if (Array.isArray(animeObject.data)) {
        animeObject.data.forEach(anime => {
            // Log the title of each anime
            console.log(anime.title);
            console.log(anime.images);
        });
    } else {
        console.error("Data is not an array.");
    }
}

// API Configuration
// const myHeaders = new Headers();
// myHeaders.append("x-apihub-key", "qRpABCZsUymYdltQ4uvdJwgKvBH3dmTPKVQqYi2CGAsKafLFgO");
// myHeaders.append("x-apihub-host", "AnimeList-API.allthingsdev.co");
// myHeaders.append("x-apihub-endpoint", "10b0d633-40f8-43ee-af7f-812833c933a1");

// const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow"
// };

// !async function name(params) {
    
// }

// // Fetch Anime Data
// async function fetchAnimeData() {
//     try {
//         const response = await fetch("https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime", requestOptions);
//         const result = await response.json();
//         displayAnimeCarousel(result.data);
//     } catch (error) {
//         console.error("Error fetching anime data:", error);

//     }
// }

// // Display Anime Carousel
// function displayAnimeCarousel(animeList) {
//     const carouselInner = document.getElementById("animeCarouselInner");
//     animeList.forEach((anime, index) => {
        
//         const itemDiv = document.createElement("div");
//         itemDiv.classList.add("carousel-item");
//         if (index === 0) itemDiv.classList.add("active"); 

//         //clickable image
//         const imgLink = document.createElement("a");
//         imgLink.href = `Pages/index.html?id=${anime.mal_id}`; // Link to single anime page
//         imgLink.addEventListener("click", function (event) {
//             event.preventDefault(); // Optional: Prevent default navigation
//             navigateToAnimePage(anime.mal_id);
//         });

//         // Image element
//         const img = document.createElement("img");
//         img.src = anime.images.jpg.image_url; // Display anime image
//         img.alt = anime.title; 
//         img.classList.add("d-block", "w-100", "movie-fixed-size"); // Add styling classes

//         // Title overlay
//         const titleOverlay = document.createElement("div");
//         titleOverlay.classList.add("carousel-caption", "d-none", "d-md-block");
//         titleOverlay.innerHTML = `<h5>${anime.title}</h5>`;

//         imgLink.appendChild(img);
//         itemDiv.appendChild(imgLink);
//         itemDiv.appendChild(titleOverlay);
//         carouselInner.appendChild(itemDiv);
//     });
// }

// // Function to handle navigation to single anime page
// function navigateToAnimePage(animeId) {
//     window.location.href = `anime.html?id=${animeId}`;
// }

// // Initialize fetch and display
// fetchAnimeData();


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

