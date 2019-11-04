const express = require('express');
const router = express.Router();
const moviesDb = require('../db/movies');

router.get('/movies', function (req, res, next) {
  res.send(moviesDb.getAll());
});

router.post('/movies', function (req, res, next) {
  moviesDb.create(req.body); // TODO validation
  res.sendStatus(204);
});

module.exports = router;
