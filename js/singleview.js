$(document).ready(function() {
    // Function to get query parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the mal_id from the URL
    const malId = getQueryParam('mal_id');
    console.log('Retrieved mal_id:', malId); // Debugging: Verify mal_id

    if (malId) {
        // API settings
        const settings = {
            url: `https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime/${malId}`,
            method: "GET",
            timeout: 0,
            headers: {
                "x-apihub-key": "JEnin8hkyJRDCQeVhNQKopRNibcHv27-fZo4v6m89NST5IcgyK",
                "x-apihub-host": "AnimeList-API.allthingsdev.co",
                "x-apihub-endpoint": "10b0d633-40f8-43ee-af7f-812833c933a1"
            },
        };

        // Make the AJAX call
        $.ajax(settings)
            .done(function(response) {
                console.log('API Response:', response); // Debugging: Inspect API response

                // Handle titles
                if (response.titles) {
                    if (Array.isArray(response.titles) && response.titles.length > 0) {
                        $('#anime-title').text(response.titles[0].title || 'No Title Available');
                    } else if (typeof response.titles === 'object') {
                        // If titles is an object with specific language keys
                        $('#anime-title').text(response.titles.en || response.titles.jp || 'No Title Available');
                    } else {
                        $('#anime-title').text('No Title Available');
                    }
                } else if (response.title) { // Fallback if titles array/object is not present
                    $('#anime-title').text(response.title || 'No Title Available');
                } else {
                    $('#anime-title').text('No Title Available');
                }

                // Handle image
                if (response.images && response.images.jpg && response.images.jpg.image_url) {
                    $('#anime-image').attr('src', response.images.jpg.image_url);
                } else {
                    // Use an online placeholder image to avoid 404 errors
                    $('#anime-image').attr('src', 'https://via.placeholder.com/400x600?text=No+Image+Available');
                    console.warn('Image URL not found. Using placeholder image.');
                }

                // Handle synopsis
                $('#anime-description').text(response.synopsis || 'No Description Available');
            })
            .fail(function(error) {
                console.error("Error fetching anime details:", error);
                $('#anime-title').text('Error Loading Anime Details');
                $('#anime-description').text('There was an error fetching the details. Please try again later.');
                // Set a fallback image on error
                $('#anime-image').attr('src', 'https://via.placeholder.com/400x600?text=No+Image+Available');
            });
    } else {
        console.warn('mal_id not found in the URL');
        $('#anime-title').text('No Anime Selected');
        $('#anime-description').html('Please select an anime from the <a href="index.html">homepage</a>.');
        // Optionally set a default image
        $('#anime-image').attr('src', 'https://via.placeholder.com/400x600?text=No+Image+Available');
    }
});