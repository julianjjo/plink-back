import express from 'express';
import logger from 'morgan';
import db from './src/models/index'
import indexRouter from './src/routes/index';
import usersRouter from './src/routes/users';
import authRouter from './src/routes/auth';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.use('/auth', authRouter);

export default app;
