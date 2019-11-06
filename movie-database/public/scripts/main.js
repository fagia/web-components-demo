; (function () {
    const getMovies = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '/api/movie-database/movies', true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                const movies = JSON.parse(this.response);
                const moviesList = document.getElementById('moviesList');
                while (moviesList.firstChild) {
                    moviesList.firstChild.remove();
                }
                const movieItemTemplate = document.getElementById('movieItemTemplate').content;
                movies.forEach(m => {
                    const movieItemEl = document.importNode(movieItemTemplate, true);
                    movieItemEl.querySelector('li').textContent = `${m.title} (${m.year})`;
                    moviesList.appendChild(movieItemEl);
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
            console.log('created movie: ', event.detail);
            getMovies();
        })
    };

    const onReady = () => {
        getMovies();
        listenOnMovieCreated();
    };

    if (document.readyState === 'complete' ||
        (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        onReady();
    } else {
        document.addEventListener('DOMContentLoaded', onReady);
    }
})();
