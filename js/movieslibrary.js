$(document).ready(function() {
    $('#searchForm').on('submit', function(event) {
        event.preventDefault();
        const query = $('#searchInput').val().trim();
        if (query) {
            searchAnime(query);
        }
    });

    function searchAnime(query) {
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

        $.ajax(settings)
            .done(function(response) {
                displayResults(response.data);
            })
            .fail(function(error) {
                console.error("Error fetching anime details:", error);
                displayError();
            });
    }

    function displayResults(animeList) {
        const productsSection = $('.products');
        productsSection.empty();

        if (animeList && animeList.length > 0) {
            const container = $('<div>').addClass('container');
            const row = $('<div>').addClass('row align-items-start');
            animeList.slice(0, 10).forEach(anime => {
                const col = $('<div>').addClass('col');
                const link = $('<a>').attr('href', `singleview.html?q=${encodeURIComponent(anime.title)}`);
                const wrapper = $('<div>').addClass('movie-img-wrapper');
                const img = $('<img>')
                    .attr('src', anime.images.jpg.image_url)
                    .addClass('img-fluid movie-fixed-size')
                    .attr('alt', anime.title);
                const overlay = $('<div>').addClass('overlay').text(anime.title.toLowerCase().replace(/ /g, ' '));
                wrapper.append(img, overlay);
                link.append(wrapper);
                col.append(link);
                row.append(col);
            });
            container.append(row);
            productsSection.append(container);
        } else {
            productsSection.append('<p>No results found.</p>');
        }
    }

    function displayError() {
        const productsSection = $('.products');
        productsSection.empty();
        productsSection.append('<p>Error fetching anime details. Please try again later.</p>');
    }
});