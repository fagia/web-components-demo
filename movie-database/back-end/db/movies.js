const movies = [
    {
        id: 0,
        title: 'Interstellar',
        year: 2014,
        createdAt: new Date(2019, 10, 4, 12, 00, 00)
    },
    {
        id: 1,
        title: 'Joker',
        year: 2019,
        createdAt: new Date(2019, 10, 4, 12, 01, 00)
    }
];

var seq = movies.length;

const moviesDb = {
    create: movie => {
        movie.id = seq;
        movie.createdAt = new Date();
        movies.push(movie);
        seq++;
        return movie;
    },
    getAll: () => {
        return movies.sort((a, b) => { return a.createdAt - b.createdAt });
    },
    getById: id => {
        return movies.filter(m => {
            return id === m.id;
        })[0];
    }
};

module.exports = moviesDb;