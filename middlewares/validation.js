const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const checkLink = Joi.string().custom((value, helper) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helper.message('Неверный формат ссылки');
});

const checkEmail = Joi.string().required().email();

const checkUserCreate = celebrate({
  body: Joi.object().keys({
    email: checkEmail,
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const checkLogin = celebrate({
  body: Joi.object().keys({
    email: checkEmail,
    password: Joi.string().required(),
  }),
});

const checkUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const checkCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: checkLink,
    trailerLink: checkLink,
    thumbnail: checkLink,
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const checkMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const checkUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  checkUserCreate,
  checkUserInfo,
  checkCreateMovie,
  checkMovieId,
  checkUserId,
  checkLogin,
};
