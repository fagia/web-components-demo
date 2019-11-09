var express = require('express');
var router = express.Router();
const reviewsDb = require('../db/reviews');

router.get('/reviews', function (req, res, next) {
  res.send(reviewsDb.getAll());
});

module.exports = router;
