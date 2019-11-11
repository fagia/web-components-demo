const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

const movieDatabaseProxy = proxy({
    pathRewrite: {
        '^/movie-database': '/'
    },
    target: 'http://movie-database:3000'
});
app.use('/api/movie-database', movieDatabaseProxy);
app.use('/movie-database/components', movieDatabaseProxy);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/movie-reviews', apiRouter);

module.exports = app;
