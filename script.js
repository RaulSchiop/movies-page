const api_url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=cefaf1675b6e66d6e90b63976ad3f80e&page=1';
const img_path = 'https://image.tmdb.org/t/p/w1280/';
const search = 'https://api.themoviedb.org/3/search/movie?api_key=cefaf1675b6e66d6e90b63976ad3f80e&query=';
const SearchBtn=document.getElementById('search')
getMovies(api_url);

async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovie(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function showMovie(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { id, title, poster_path, vote_average, overview } = movie;

        const element = document.createElement('div');
        element.classList.add('movie');

        
        element.dataset.movieId = id;

        element.innerHTML = `
            <img src="${img_path + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${score(vote_average)}">${vote_average.toFixed(2)}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

        main.appendChild(element);
    });
}


function score(vote) {
    if (vote < 5) {
        return 'red';
    } else if (vote > 8) {
        return 'green';
    } else {
        return 'orange';
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = SearchBtn.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(search + searchTerm);
        SearchBtn.value = '';
    } else {
        window.location.reload();
    }
});


main.addEventListener('click', (event) => {
    const movieCard = event.target.closest('.movie');
    if (movieCard) {
        const movieId = movieCard.dataset.movieId;
        if (movieId) {
            window.location.href = `muv.html?id=${movieId}`;
        } else {
            console.error('Movie ID not found.');
        }
    }
});
