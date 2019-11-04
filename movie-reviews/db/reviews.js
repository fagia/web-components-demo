const reviews = [
    {
        id: 0,
        movieId: 0,
        description: 'With our time on Earth coming to an end, a team of explorers undertakes the most important mission in human history; traveling beyond this galaxy to discover whether mankind has a future among the stars...',
        rating: 9,
        createdAt: new Date(2019, 10, 4, 13, 00, 00)
    },
    {
        id: 1,
        movieId: 1,
        description: '"Joker" centers around the iconic arch nemesis and is an original, standalone fictional story not seen before on the big screen...',
        rating: 9,
        createdAt: new Date(2019, 10, 4, 13, 01, 00)
    }
];

var seq = reviews.length;

const reviewsDb = {
    create: review => {
        review.id = seq;
        review.createdAt = new Date();
        review.movieId = parseInt(review.movieId, 10);
        reviews.push(review);
        seq++;
        return review;
    },
    getAll: () => {
        return reviews.sort((a, b) => { return a.createdAt - b.createdAt });
    }
};

module.exports = reviewsDb;