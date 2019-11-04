const movies = [
    {
        id: 0,
        title: 'Interstellar',
        year: 2014
    },
    {
        id: 1,
        title: 'Joker',
        year: 2019
    }
];

var seq = movies.length;

const moviesDb = {
    create: movie => {
        movie.id = seq;
        movies.push(movie);
        seq++;
        return movie;
    },
    getAll: () => {
        return movies;
    },
    getById: id => {
        return movies.filter(m => {
            return id === m.id;
        })[0];
    }
};

module.exports = moviesDb;