const Card = require('../models/cards');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { CREATED, OK } = require('../utils/statusCodes');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(OK).send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.addCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ name, link, owner });
    res.status(CREATED).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(() => new NotFoundError('Карточка не найдена'));

    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нет прав на удаление карточки');
    }

    await Card.deleteOne({ _id: card._id });
    res.send({ message: 'Карточка удалена' });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный id карточки'));
    } else {
      next(err);
    }
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(() => new NotFoundError('Карточка не найдена'));

    res.status(OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный id карточки'));
    } else {
      next(err);
    }
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(() => new NotFoundError('Карточка не найдена'));

    res.status(OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный id карточки'));
    } else {
      next(err);
    }
  }
};
