const Movie = require('../models/movie');
const ErrorNotFound = require('../error/ErrorNotFound');
const ErrorNoRights = require('../error/ErrorNoRights');

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new ErrorNotFound('Фильм не найден');
      }
      if (String(movie.owner) !== String(req.user._id)) {
        throw new ErrorNoRights('Нет прав на удаление');
      }
      // console.log(req.params._id);
      return Movie.findByIdAndRemove(req.params._id);
    })
    .then((movie) => res.send(movie))
    .catch(next);
};
