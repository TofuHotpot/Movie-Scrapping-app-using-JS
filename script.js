const API_KEY = 'insert_your_key'; 
const API_URL = 'https://api.themoviedb.org/3/search/movie';

async function searchMovies() {
    const searchInput = document.getElementById('searchInput');
    const moviesContainer = document.getElementById('movies');
    const query = searchInput.value.trim();
    if (!query) return;

    moviesContainer.innerHTML = '<div class="loading"></div>';

    try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        displayMovies(data.results);

        if (data.results.length === 0) {
            moviesContainer.innerHTML = '<p>No results found. Try another search!</p>';
            return;
        }

        displayMovies(data.results);

    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" title="${movie.title}\n\n${movie.overview}">
            <h3>${movie.title}</h3>
            <p>${movie.overview.substring(0, 100)}...</p
            </div>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
});
