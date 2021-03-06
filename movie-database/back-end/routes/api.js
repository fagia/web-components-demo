const express = require('express');
const router = express.Router();
const moviesDb = require('../db/movies');

router.get('/movies', function (req, res, next) {
  res.send(moviesDb.getAll());
});

router.get('/movies/:id', function (req, res, next) {
  res.send(moviesDb.getById(parseInt(req.params.id, 10)));
});

router.post('/movies', function (req, res, next) {
  res.send(moviesDb.create(req.body)); // TODO validation
});

module.exports = router;
