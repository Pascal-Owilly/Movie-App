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
		const btn = document.createElement("BUTTON");
		btn.id = "someId";
		btn.setAttribute("data-bs-toggle", "modal");
		btn.setAttribute("data-bs-target", "#myModal");
		// $(btn).modal();
		btn.innerHTML = "View Movie"
		text.innerHTML = `${movie.title}`;
		text.classList.add("fs-5", "bg-danger", "py-1", "text-light");
		image.src = IMG_PATH + movie.poster_path;
		image.classList.add("w-100")
		movieCard.appendChild(image);
		movieCard.appendChild(text);
		movieCard.appendChild(btn);
		movieCard.classList.add("mb-4")
		movieContainer.appendChild(movieCard);
		

		

	});


}



function displayModal(data) {

	data.results.forEach((movie) => {

		
		$("button#someId").click(function () {

			let displayTittle = document.querySelector("#exampleModalLabel")
			displayTittle.innerHTML = `${movie.title}`

			let displayOverview = document.querySelector(".movie-overview")
			displayOverview.innerHTML = `${movie.overview}`

			let displayRating = document.querySelector(".movie-ratings")
			displayRating.innerHTML = `Ratings: ${movie.vote_average}`

			let displayDate = document.querySelector(".movie-date")
			displayDate.innerHTML = `Release Date: ${movie.release_date}`

			
		})


	})

}




// function createModal (){
// 	const modalOuter = document.createElement('div');
// 	modalOuter.classList.add("modal fade");
// 	modalOuter.setAttribute('tabindex', "-1");
// 	modalOuter.setAttribute('id', 'myModal');
// 	modalOuter.setAttribute('aria-labelledby', 'exampleModalLabe');
// 	modalOuter.setAttribute('aria-hidden', 'true');
	
	
	
// 	const modalInner = document.createElement('div');
// 	modalInner.classList.add('modal-dialog')
// 	modalOuter.appendChild(modalInner);
	
	
// 	const modalContent = document.createElement('div');
// 	modalContent.classList.add('modal-content')
// 	modalInner.appendChild(modalContent);
	
// 	const modalHeading = document.createElement('div');
// 	modalHeading.classList.add('modal-header')
// 	modalContent.appendChild(modalHeading);
	
// 	const modalHeading5 = document.createElement('h1');
// 	modalHeading5.classList.add('modal-title')
// 	modalOuter.setAttribute('id', "exampleModalLabel");
// 	modalHeading5.innerHTML= `${movie.title}`
// 	modalHeading.appendChild(modalHeading5);
	
// 	const closeButton = document.createElement('button');
// 	closeButton.classList.add('btn-close');
// 	closeButton.setAttribute('data-bs-dismiss', "modal");
// 	closeButton.setAttribute('aria-label', "close");
// 	modalHeading.appendChild(closeButton);
	
	
// 	const modalBody = document.createElement('div');
// 	modalBody.classList.add('modal-body')
// 	modalInner.appendChild(modalBody);
	
// 	const modalOverview = document.createElement('p');
// 	modalOverview.classList.add('movie-overview')
// 	modalOverview.innerHTML= `${movie.overview}`
// 	modalBody.appendChild(modalOverview);
	
// 	const modalRatings = document.createElement('h4');
// 	modalRatings.classList.add('movie-ratings')
// 	modalRatings.innerHTML = `Ratings: ${movie.vote_average}`
// 	modalBody.appendChild(modalRatings);
	
// 	const modalRelease = document.createElement('h4');
// 	modalRelease.classList.add('movie-date')
// 	modalRelease.innerHTML = `Release Date: ${movie.release_date}`
// 	modalBody.appendChild(modalRatings);
	
	
// 	const modalFooter = document.createElement('div');
// 	modalFooter.classList.add('modal-footer');
// 	modalInner.appendChild(modalFooter);
	
	
// 	const modalFooterButton = document.createElement('button');
// 	modalFooterButton.classList.add('btn btn-secondary');
// 	closeButton.setAttribute('data-bs-dismiss', "modal");
// 	modalFooter.appendChild(modalFooterButton);

// 	displayModal()
	
	
// }





/** Fetch Movies */
async function fetchMovies(url) {
	let res = await fetch(url);
	let data = await res.json();
	console.log(data);
	
	createMovieItems(data);
	displayModal(data);


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