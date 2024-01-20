const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail').default;
const isURL = require('validator/lib/isURL').default;
const UnauthorizedError = require('../errors/UnauthorizedError');

const validateEmail = (email) => isEmail(email);
const validateURL = (url) => isURL(url);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно к заполнению'],
    minlength: [2, 'Минимальная длина имени - 2 символа'],
    maxlength: [30, 'Максимальная длина имени - 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: [true, 'Описание обязательно к заполнению'],
    minlength: [2, 'Минимальная длина описания - 2 символа'],
    maxlength: [30, 'Максимальная длина описания - 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: [true, 'Ссылка на аватар обязательна'],
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [validateURL, 'Неправильный формат ссылки'],
  },
  email: {
    type: String,
    required: [true, 'Email обязателен'],
    unique: true,
    validate: [validateEmail, 'Неправильный формат почты'],
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
