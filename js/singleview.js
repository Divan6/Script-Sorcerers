$(document).ready(function() {
    // Function to get query parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the 'q' parameter from the URL
    const query = getQueryParam('q');
    console.log('Retrieved query:', query); // Debugging: Verify query

    if (query) {
        // API settings
        const settings = {
            url: `https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime?q=${encodeURIComponent(query)}`,
            method: "GET",
            timeout: 0,
            headers: {
                "x-apihub-key": "JeVhNQKopRNibcHv27-fZo4v6m8Enin8hkyJRDCQ9NST5IcgyK",
                "x-apihub-host": "AnimeList-API.allthingsdev.co",
                "x-apihub-endpoint": "10b0d633-40f8-43ee-af7f-812833c933a1"
            },
        };

        // Show loading indicator and hide anime details
        $('#loading-indicator').show();
        $('.anime-details-container').hide();

        // Make the AJAX call
        $.ajax(settings)
            .done(function(response) {
                console.log('API Response:', response); // Debugging: Inspect API response

                // Assuming the API returns an array of results
                if (response && Array.isArray(response.data) && response.data.length > 0) {
                    const anime = response.data[0]; // Taking the first result

                    // Handle titles
                    const title = anime.titles?.en || anime.titles?.jp || anime.title || 'No Title Available';
                    $('#anime-title').text(title);

                    // Handle image
                    const imageUrl = anime.images?.jpg?.image_url || 'https://via.placeholder.com/400x600?text=No+Image+Available';
                    $('#anime-image').attr('src', imageUrl);

                    // Handle synopsis
                    const synopsis = anime.synopsis || 'No Description Available';
                    $('#anime-description').text(synopsis);

                    // Handle Watchlist Button (Optional: Make it functional)
                    $('.watchlist-container').on('click', function() {
                        // Implement watchlist functionality here
                        alert('Added to Watchlist!');
                    });

                    // Handle genres/tags if provided by API
                    if (anime.genres && Array.isArray(anime.genres)) {
                        const tagsContainer = $('.tag-container');
                        tagsContainer.empty(); // Clear existing tags

                        anime.genres.slice(0, 3).forEach(genre => { // Limit to 3 genres
                            const tagBox = $('<div>').addClass('tag-box');
                            const tagText = $('<span>').addClass('tag-text').text(genre.name.toUpperCase());
                            tagBox.append(tagText);
                            tagsContainer.append(tagBox);
                        });
                    } else {
                        // If no genres available
                        $('.tag-container').remove(); // Remove the container if no genres
                    }

                    // Hide loading indicator and show anime details
                    $('#loading-indicator').hide();
                    $('.anime-details-container').show();
                } else {
                    // No results found
                    $('#loading-indicator').hide();
                    $('.anime-details-container').show();
                    $('#anime-title').text('Anime Not Found');
                    $('#anime-description').text('No details available for the selected anime.');
                    $('#anime-image').attr('src', 'https://via.placeholder.com/400x600?text=No+Image+Available');
                    $('.tag-container').remove(); // Remove genre tags if no anime found
                }
            })
            .fail(function(error) {
                console.error("Error fetching anime details:", error);
                $('#loading-indicator').hide();
                $('.anime-details-container').show();
                $('#anime-title').text('Error Loading Anime Details');
                $('#anime-description').text('There was an error fetching the details. Please try again later.');
                // Set a fallback image on error
                $('#anime-image').attr('src', 'https://via.placeholder.com/400x600?text=No+Image+Available');
                $('.tag-container').remove(); // Remove genre tags on error
            });
    } else {
        console.warn('Query parameter "q" not found in the URL');
        $('#loading-indicator').hide();
        $('.anime-details-container').show();
        $('#anime-title').text('No Anime Selected');
        $('#anime-description').html('Please select an anime from the <a href="index.html">homepage</a>.');
        // Optionally set a default image
        $('#anime-image').attr('src', 'https://via.placeholder.com/400x600?text=No+Image+Available');
        $('.tag-container').remove(); // Remove genre tags if no anime selected
    }

    // Toggle active class on watchlist button click
    $('.watchlist-container').on('click', function() {
        $(this).toggleClass('active');

        // Optional: Change the button text based on active state
        if ($(this).hasClass('active')) {
            $(this).find('.watchlist-text').text('Added to Watchlist');
        } else {
            $(this).find('.watchlist-text').text('Add to Watchlist');
        }
    });
});