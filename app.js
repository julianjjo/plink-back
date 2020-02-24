var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./src/models/index.js");
console.log(db);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
