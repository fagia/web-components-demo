const express = require('express');
const router = express.Router();
const moviesDb = require('../db/movies');

router.get('/movies', function (req, res, next) {
  res.send(moviesDb.getAll());
});

module.exports = router;
