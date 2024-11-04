# Title: Nihon Mystica


![Nihon Mystica Logo](./images/logo.png "Project Logo")


## Description


This website is an anime hosting website that has a blend of crunchyrolls aesthetics blended with netflix.
## Website Link


Visit the live website here: [http://nihonmystica.com/](http://nihonmystica.com/)


## Repository Link


View the GitHub repository here: [https://github.com/Divan6/Script-Sorcerers.git](https://github.com/Divan6/Script-Sorcerers.git)


## Screenshots


## Documentation

AnimeList API Documentation

Overview

The AnimeList API provides access to a vast collection of anime-related information, including details about popular titles such as Naruto, Shin Chan, Dragon Ball Z, and more.


Endpoints

Retrieve Anime Details

Endpoint: /anime/{mal_id}
Method: GET
Description: Retrieve detailed information about a specific anime.


Request Parameters

q: (Required) The animation series name to be searched.
Type: String
Example: Naruto


Response Parameters

mal_id: The AnimeList ID of the anime.
url: The URL of the anime on AnimeList.
images: URLs to images associated with the anime.
approved: Indicates if the anime information is approved.
titles: Different titles associated with the anime.
type: The type of anime (e.g., TV, Movie).
source: The source material of the anime (e.g., Manga, Light Novel).
episodes: The number of episodes of the anime.
status: The airing status of the anime.
aired: Information about the airing period of the anime.
duration: Duration of each episode.
rating: Content rating of the anime.
score: Average score of the anime.
scored_by: Number of users who scored the anime.
rank: Ranking of the anime.
popularity: Popularity rank of the anime.
members: Number of users who have added the anime to their list.
favorites: Number of users who have marked the anime as a favorite.
synopsis: Synopsis of the anime.
background: Background information about the anime.
season: Season in which the anime aired.
year: Year in which the anime aired.
broadcast: Information about the broadcast schedule of the anime.


Additional Information

This API documentation provides a comprehensive overview of the AnimeList API, including endpoints, request and response examples, and response parameters. Developers can use this information to integrate and interact with the AnimeList API seamlessly to retrieve detailed information about anime titles such as Naruto.


## Test Endpoint

const myHeaders = new Headers();
myHeaders.append("x-apihub-key", "y4LJ3aK6dZDzq4KDRGwnHJkZoon7XP313Rx2HKD9u8jTNxKSKh");
myHeaders.append("x-apihub-host", "AnimeList-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "10b0d633-40f8-43ee-af7f-812833c933a1");

const requestOptions = {
   method: "GET",
   headers: myHeaders,
   redirect: "follow"
};

fetch("https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime?q=Naruto", requestOptions)
   .then((response) => response.text())
   .then((result) => console.log(result))
   .catch((error) => console.error(error));

## Team Roles