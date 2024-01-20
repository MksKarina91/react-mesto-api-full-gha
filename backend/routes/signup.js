const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/index');
const { addUser } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30), // Если поле не обязательно, можно оставить так
    about: Joi.string().min(2).max(30), // Если поле не обязательно, можно оставить так
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    avatar: Joi.string().regex(urlRegex), // Если поле не обязательно, можно оставить так
  }),
}), addUser);

module.exports = router;
