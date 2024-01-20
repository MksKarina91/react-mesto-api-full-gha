const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;
const extractBearerToken = (header) => header.replace('Bearer ', '');
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Авторизация необходима'));
    return;
  }

  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new AuthError('Некорректный токен'));
    return;
  }

  req.user = payload;

  next();
};
