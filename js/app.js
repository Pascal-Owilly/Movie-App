/**Base URL */

const API_URL =
	"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6136f29a710a02332f5efbc043ba0720&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_URL =
	"https://api.themoviedb.org/3/search/movie?&api_key=6136f29a710a02332f5efbc043ba0720&query=";

/** Create Movie Cards UI */

function createMovieItems(data) {
	let movieContainer = document.querySelector(".movie-list-container");
	movieContainer.innerHTML = "";
	data.results.forEach((movie) => {
		const movieCard = document.createElement("div");
		const image = document.createElement("img");
		const text = document.createElement("h2");
		text.innerHTML = `${movie.title}`;
		image.src = IMG_PATH + movie.poster_path;
		movieCard.appendChild(image);
		movieCard.appendChild(text);
		movieContainer.appendChild(movieCard);
	});
}

/** Fetch Movies */
async function fetchMovies(url) {
	let res = await fetch(url);
	let data = await res.json();
	console.log(data);
	createMovieItems(data);
}

window.addEventListener("DOMContentLoaded", function () {
	fetchMovies(API_URL);
    let search = document.querySelector('#search');
    search.addEventListener('submit', (e) => {
        e.preventDefault();
        let input = document.querySelector('#find');
        let searchUrl = SEARCH_URL + input.value;
        fetchMovies(searchUrl);
    })
});

