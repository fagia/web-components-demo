const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');


const app = express();

const apiMovieDatabaseProxy = proxy({
    target: 'http://movie-database:3000'
});
app.use('/api/movie-database', apiMovieDatabaseProxy);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

const movieComponentsProxy = proxy({
    pathRewrite: {
        '^/movie-components': '/'
    },
    target: 'http://movie-components:8080'
});
app.use('/movie-components', movieComponentsProxy);

module.exports = app;
