const movies = [
    {
        title: 'Interstellar',
        year: 2014
    },
    {
        title: 'Joker',
        year: 2019
    }
];

const moviesDb = {
    getAll: () => {
        return movies;
    }
};

module.exports = moviesDb;