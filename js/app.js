/**Base URL */

const API_URL =
	"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6136f29a710a02332f5efbc043ba0720&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w300";

const SEARCH_URL =
	"https://api.themoviedb.org/3/search/movie?&api_key=6136f29a710a02332f5efbc043ba0720&query=";

console.log(API_URL)

/** Create Movie Cards UI */



function createMovieItems(data) {
	let movieContainer = document.querySelector(".movie-list-container");
	movieContainer.innerHTML = "";
	data.results.forEach((movie) => {
		const movieCard = document.createElement("div");
		const image = document.createElement("img");
		const text = document.createElement("h2");
		movieCard.setAttribute("data-bs-toggle", "modal")
		movieCard.setAttribute("data-bs-target", "#myModal")
		movieCard.addEventListener("click", function () {
			displayModal(movie)
		})
		text.innerHTML = `${movie.title}`;
		text.classList.add("fs-5", "bg-danger", "py-1", "text-light");
		image.src = IMG_PATH + movie.poster_path;
		image.classList.add("w-100")
		movieCard.appendChild(image);
		movieCard.appendChild(text);

		movieCard.classList.add("mb-4")
		movieContainer.appendChild(movieCard);

	});

}



function displayModal(movie) {

	let displayTittle = document.querySelector("#exampleModalLabel")
	displayTittle.innerHTML = `${movie.title}`

	let displayOverview = document.querySelector(".movie-overview")
	displayOverview.innerHTML = `${movie.overview}`

	let displayRating = document.querySelector(".movie-ratings")
	displayRating.innerHTML = `Ratings: ${movie.vote_average}`

	let displayDate = document.querySelector(".movie-date")
	displayDate.innerHTML = `Release Date: ${movie.release_date}`

}



/** Fetch Movies */
async function fetchMovies(url) {
	let res = await fetch(url);
	let data = await res.json();

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