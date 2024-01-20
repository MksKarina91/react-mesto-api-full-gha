const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/Conflict');
const { CREATED, OK } = require('../utils/statusCodes');

module.exports.addUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.status(CREATED).send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user._id
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с указанным email уже зарегистрирован'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const { NODE_ENV, JWT_SECRET } = process.env;
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(OK).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .orFail(() => new NotFoundError('Пользователь по указанному id не найден'));
    res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный id пользователя'));
    } else {
      next(err);
    }
  }
};

module.exports.updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError('Пользователь по указанному id не найден'));
    res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные пользователя'));
    } else {
      next(err);
    }
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError('Пользователь по указанному id не найден'));
    res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Некорректный URL аватара'));
    } else {
      next(err);
    }
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(OK).send(user);
  } catch (err) {
    next(err);
  }
};
