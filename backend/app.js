require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://mkskarina.nomoredomainsmonster.ru'],
  credentials: true,
  maxAge: 30,
}));

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('Соединение с базой данных установлено'))
  .catch((err) => console.error('Ошибка подключения к базе данных:', err));

app.use(requestLogger);
app.use(errorLogger);
app.use(express.json());
app.use(cookieParser());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/index'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());
const errorHandler = require('./middlewares/error-handler');

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
