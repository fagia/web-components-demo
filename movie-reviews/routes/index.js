var express = require('express');
var router = express.Router();
const reviewsDb = require('../db/reviews');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Movie Reviews' });
});

router.post('/', function (req, res, next) {
  reviewsDb.create(req.body);
  res.set('Location', '/');
  res.sendStatus(303);
});

module.exports = router;
