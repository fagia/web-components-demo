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
                const movieOptionTemplate = document.getElementById('movieOptionTemplate').content;
                movies.forEach(m => {
                    const movieOptionEl = document.importNode(movieOptionTemplate, true);
                    const movieOption = movieOptionEl.querySelector('option');
                    movieOption.setAttribute('value', m.id);
                    movieOption.textContent = `${m.title} (${m.year})`;
                    if (selectedMovieId === m.id) {
                        movieOption.setAttribute('selected', 'selected');
                    }
                    moviesSelect.appendChild(movieOptionEl);
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
        const reviewsRequest = new XMLHttpRequest();
        reviewsRequest.open('GET', '/api/movie-reviews/reviews', true);
        reviewsRequest.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                const reviews = JSON.parse(this.response);
                const moviesRequest = new XMLHttpRequest();
                moviesRequest.open('GET', '/api/movie-database/movies', true);
                moviesRequest.onload = function () {
                    if (this.status >= 200 && this.status < 400) {
                        const movies = JSON.parse(this.response);
                        const reviewsList = document.getElementById('reviewsList');
                        while (reviewsList.firstChild) {
                            reviewsList.firstChild.remove();
                        }
                        const reviewItemTemplate = document.getElementById('reviewItemTemplate').content;
                        const reviewRatingStar = document.getElementById('reviewRatingStar').content;
                        reviews.forEach(r => {
                            const movie = movies.filter(m => m.id === r.movieId)[0];
                            const reviewItemEl = document.importNode(reviewItemTemplate, true);
                            const ratingEl = reviewItemEl.querySelector('.card-header-icon');
                            for (var i = 0; i < r.rating; i++) {
                                ratingEl.appendChild(document.importNode(reviewRatingStar, true));
                            }
                            reviewItemEl.querySelector('.card-header-title-suffix').textContent = `${movie.title} (${movie.year})`;
                            reviewItemEl.querySelector('.content').textContent = r.description;
                            reviewsList.appendChild(reviewItemEl);
                        });
                    } else {
                        console.error('got error from server', this.status, this.response);
                    }
                };
                moviesRequest.onerror = function () {
                    console.error('failed to send movies request');
                };
                moviesRequest.send();
            } else {
                console.error('got error from server', this.status, this.response);
            }
        };
        reviewsRequest.onerror = function () {
            console.error('failed to send reviews request');
        };
        reviewsRequest.send();
    };

    const listenOnMovieCreationEvents = () => {
        const addMovie = document.getElementById('addMovie');
        addMovie.addEventListener('movieCreated', event => {
            const movie = event.detail;
            console.log('created movie: ', movie);
            initMoviesSelect(movie.id);
            toggleAddMovie();
        });
        addMovie.addEventListener('movieCreationCanceled', () => {
            toggleAddMovie();
        });
    };

    var selectMovie;
    var addMovie;
    var goToAddMovie;
    var submitReview;
    const onReady = () => {
        getReviews();
        initMoviesSelect();
        listenOnMovieCreationEvents();
        selectMovie = document.getElementById('selectMovie');
        addMovie = document.getElementById('addMovie');
        goToAddMovie = document.getElementById('goToAddMovie');
        submitReview = document.getElementById('submitReview');
        goToAddMovie.addEventListener('click', e => {
            e.preventDefault();
            toggleAddMovie();
        });
        console.log('ready');
    };

    if (document.readyState === 'complete' ||
        (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        onReady();
    } else {
        document.addEventListener('DOMContentLoaded', onReady);
    }

    const toggleAddMovie = () => {
        selectMovie.style.display = selectMovie.style.display === 'none' ? '' : 'none';
        addMovie.style.display = addMovie.style.display === 'none' ? '' : 'none';
        if (addMovie.style.display === 'none') {
            submitReview.removeAttribute('disabled');
        } else {
            submitReview.setAttribute('disabled', 'disabled');
        }
    };

})();
