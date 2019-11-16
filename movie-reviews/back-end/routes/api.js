const express = require('express');
const http = require('http');
const router = express.Router();
const reviewsDb = require('../db/reviews');

const MOVIES_ENDPOINT = 'http://movie-database:3000/movie-database/api/movies';

router.get('/reviews', function (req, res, next) {
  http.get(MOVIES_ENDPOINT, httpRes => {
    let moviesData = '';
    httpRes.on('data', chunk => {
      moviesData += chunk;
    });
    httpRes.on('end', () => {
      const movies = JSON.parse(moviesData);
      const reviews = reviewsDb.getAll();
      reviews.forEach(r => {
        r.movie = movies.filter(m => m.id === r.movieId)[0];
      });
      res.send(reviews);
    });
  }).on('error', err => {
    console.error(`Error while invoking ${MOVIES_ENDPOINT} endpoint`, err);
    res.sendStatus(500);
  });
});

module.exports = router;
