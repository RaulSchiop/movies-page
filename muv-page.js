const api_key = 'cefaf1675b6e66d6e90b63976ad3f80e'; 
const mainMuv = document.getElementById("main-muv");

async function getMovieDetails(movieId) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        showMovie(data);
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}


const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
getMovieDetails(movieId);

function showMovie(movie) {
    mainMuv.innerHTML = '';

    const { title, poster_path, vote_average, overview } = movie; 
    const element = document.createElement('div');
    element.classList.add('movie-page');

    element.innerHTML = `
        <div class="movie-page">
            <img src="https://image.tmdb.org/t/p/w1280/${poster_path}" alt="${title}" class="img-page">
            <div class="movie-info page" id="page-info">
            <div class="contin">
                <h3 class="h3-page">${title}</h3>
                <span class="green" id="rating-page">${vote_average.toFixed(2)}</span>
            </div>
            <div class="overview-page">
                <h3>Overview</h3>
                ${overview}
                </div>
            </div>
        </div>
    `;

    mainMuv.appendChild(element); 
}
