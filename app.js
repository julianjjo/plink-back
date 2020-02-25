var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./src/models/index");
const env = process.env.NODE_ENV  || 'development';
if (env == 'development') {
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
} else {
  db.sequelize.sync();
}


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', usersRouter);

module.exports = app;
