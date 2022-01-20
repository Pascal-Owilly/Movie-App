/**Base URL */

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6136f29a710a02332f5efbc043ba0720&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w300";

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
    movieCard.setAttribute("data-bs-toggle", "modal");
    movieCard.setAttribute("data-bs-target", "#myModal");
    movieCard.addEventListener("click", function () {
      displayModal(movie);
    });
    text.innerHTML = `${movie.title}`;
    text.classList.add("fs-5", "bg-danger", "py-1", "text-light");
    image.src = IMG_PATH + movie.poster_path;
    image.classList.add("w-100");
    movieCard.appendChild(image);
    movieCard.appendChild(text);

    movieCard.classList.add("mb-4");
    movieContainer.appendChild(movieCard);
  });
}

/**Create A Modal to display Movie Items */
function displayModal(movie) {
  let displayTittle = document.querySelector("#exampleModalLabel");
  displayTittle.innerHTML = `${movie.title}`;

  let displayOverview = document.querySelector(".movie-overview");
  displayOverview.innerHTML = `${movie.overview}`;

  let displayRating = document.querySelector(".movie-ratings");
  displayRating.innerHTML = `Ratings: ${movie.vote_average}`;

  let displayDate = document.querySelector(".movie-date");
  displayDate.innerHTML = `Release Date: ${movie.release_date}`;

  //Add Trailer to Modal
  let trailerButton = document.querySelector('#trailer-btn');
  trailerButton.addEventListener('click', function(){
	  getTrailer(movie.title);
  });

  //Remove Trailer when Modal is closed
  let modalButton = document.querySelector('#close-modal');
  modalButton.addEventListener('click', function(){
	  removeTrailer();
  })
}

/**Fetch Video from Youtube */
async function getTrailer(title) {
  const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
  const API_KEY = "AIzaSyCFiCTTSCs2HcLtUWFHd-Wif7wh7EwpLFc";
  let searchUrl = `${BASE_URL}?key=${API_KEY}&type=video&part=snippet&q=${title}`;
  let res = await fetch(searchUrl);
  let data = await res.json();
  let videoId = data.items[0].id.videoId;
  console.log(videoId);
  displayTrailer(videoId);
}

/**Display Movie Trailer */
function displayTrailer(id){
	let videoContainer = document.querySelector('#trailer');
	let iframes = document.querySelectorAll('iframe');
	for(let i = 0; i < iframes.length; i++){
		iframes[i].parentNode.removeChild(iframes[i])
	}
    let iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}`;
	iframe.width = '460'
	iframe.height = '300'
    videoContainer.append(iframe);
}

/**Delete Iframe when User Closes Modal */
function removeTrailer(){
	let iframe = document.querySelector('iframe');
	iframe.parentNode.removeChild(iframe);
}

/** Fetch Movies */
async function fetchMovies(url) {
  let res = await fetch(url);
  let data = await res.json();

  createMovieItems(data);
}

window.addEventListener("DOMContentLoaded", function () {
  fetchMovies(API_URL);
  let search = document.querySelector("#search");
  search.addEventListener("submit", (e) => {
    e.preventDefault();
    let input = document.querySelector("#find");
    let searchUrl = SEARCH_URL + input.value;
    fetchMovies(searchUrl);
  });
});
