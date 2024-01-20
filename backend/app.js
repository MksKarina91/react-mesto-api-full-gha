require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes/index');
const { ServerErrorHandler } = require('./errors/errorHandlers/ServerErrorHandler');
const { NotFoundErrorHandler } = require('./errors/errorHandlers/NotFoundErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://mkskarina.nomoredomainsmonster.ru'],
  credentials: true,
  maxAge: 30,
}));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use('*', NotFoundErrorHandler);
app.use(errorLogger);
app.use(errors());
app.use(ServerErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
