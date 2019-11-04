; (function () {
    const initMoviesSelect = (selectedMovieId) => {
        const request = new XMLHttpRequest();
        request.open('GET', '/api/movie-database/movies', true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                const movies = JSON.parse(this.response);
                const moviesSelect = document.getElementById('moviesSelect');
                while (moviesSelect.firstChild) {
                    moviesSelect.firstChild.remove();
                }
                movies.forEach(m => {
                    const movieOption = document.createElement('option');
                    movieOption.setAttribute('value', m.id);
                    movieOption.textContent = `${m.title} (${m.year})`;
                    if (selectedMovieId === m.id) {
                        movieOption.setAttribute('selected', 'selected');
                    }
                    moviesSelect.appendChild(movieOption);
                });
            } else {
                console.error('got error from server', this.status, this.response);
            }
        };
        request.onerror = function () {
            console.error('failed to send request');
        };
        request.send();
    };
    const getReviews = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '/api/movie-reviews/reviews', true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                const reviews = JSON.parse(this.response);
                const reviewsList = document.getElementById('reviewsList');
                while (reviewsList.firstChild) {
                    reviewsList.firstChild.remove();
                }
                reviews.forEach(r => {
                    const request = new XMLHttpRequest();
                    request.open('GET', `/api/movie-database/movies/${r.movieId}`, true);
                    request.onload = function () {
                        if (this.status >= 200 && this.status < 400) {
                            const movie = JSON.parse(this.response);
                            const reviewItem = document.createElement('li');
                            reviewItem.textContent = `[${r.rating}/10] ${movie.title} (${movie.year}) - ${r.description}`;
                            reviewsList.appendChild(reviewItem);
                        } else {
                            console.error('got error from server', this.status, this.response);
                        }
                    };
                    request.onerror = function () {
                        console.error('failed to send request');
                    };
                    request.send();
                });
            } else {
                console.error('got error from server', this.status, this.response);
            }
        };
        request.onerror = function () {
            console.error('failed to send request');
        };
        request.send();
    };

    const listenOnMovieCreated = () => {
        const addMovie = document.getElementById('addMovie');
        addMovie.addEventListener('movieCreated', function (event) {
            const movie = event.detail;
            console.log('created movie: ', movie);
            initMoviesSelect(movie.id);
            toggleAddMovie();
        })
    };

    const onReady = () => {
        getReviews();
        initMoviesSelect();
        listenOnMovieCreated();
    };

    if (document.readyState === 'complete' ||
        (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        onReady();
    } else {
        document.addEventListener('DOMContentLoaded', onReady);
    }

    const toggleAddMovie = () => {
        const select = document.getElementById('selectMovie');
        const add = document.getElementById('addMovie');
        select.style.display = select.style.display === 'none' ? '' : 'none';
        add.style.display = add.style.display === 'none' ? '' : 'none';
    };

    window.toggleAddMovie = toggleAddMovie;
})();
