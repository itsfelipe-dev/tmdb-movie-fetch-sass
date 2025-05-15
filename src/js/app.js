const apiKey = 'eef9ff4038f2b0e700a7188aba9ea8b0';
const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

async function fetchTrendingMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=es-ES`);
    const data = await response.json();
    displayMovies(data.results);
}

function showMovieDetails(movie) {
    document.getElementById('movieModalLabel').textContent = movie.title;
    document.getElementById('modalPoster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    document.getElementById('modalOverview').textContent = movie.overview;
    document.getElementById('modalRelease').textContent = movie.release_date;
    document.getElementById('modalRating').textContent = movie.vote_average;

    const modal = new bootstrap.Modal(document.getElementById('movieModal'));
    modal.show();
}

function displayMovies(movies) {
    const grid = document.getElementById('movie-grid');
    grid.innerHTML = '';

    movies.forEach(movie => {
        const col = document.createElement('div');
        col.addEventListener('click', () => showMovieDetails(movie));
        col.className = 'col-12 col-sm-6 col-md-4';
        col.innerHTML = `
        <div class="card movie-card shadow-sm">
            <img src="${baseImgUrl + movie.poster_path}" class="card-img-top movie-img"">
            <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">Calificación: ${movie.vote_average} ⭐</p>
            </div>
        </div>
        `;

        grid.appendChild(col);
    });
}

fetchTrendingMovies();
