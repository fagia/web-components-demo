const reviews = [
    {
        id: 0,
        movieId: 0,
        description: 'With our time on Earth coming to an end, a team of explorers undertakes the most important mission in human history; traveling beyond this galaxy to discover whether mankind has a future among the stars...',
        rating: 9
    },
    {
        id: 1,
        movieId: 1,
        description: '"Joker" centers around the iconic arch nemesis and is an original, standalone fictional story not seen before on the big screen...',
        rating: 9
    }
];

var seq = reviews.length;

const reviewsDb = {
    create: review => {
        review.id = seq;
        reviews.push(review);
        seq++;
    },
    getAll: () => {
        return reviews;
    }
};

module.exports = reviewsDb;