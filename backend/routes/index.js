const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const NotFoundError = require('../errors/NotFoundError');

// Регистрация и авторизация
router.use('/signup', signupRouter);
router.use('/signin', signinRouter);

// Аутентификация для всех последующих маршрутов
router.use(auth);

// Маршруты для пользователей и карточек
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

// Обработка несуществующих маршрутов
router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
