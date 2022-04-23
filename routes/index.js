const router = require('express').Router();
const routerUser = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../error/ErrorNotFound');
const validation = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signin', validation.checkLogin, login);
router.post('/signup', validation.checkUserCreate, createUser);

router.use(auth);

router.use('/users', routerUser);
router.use('/movies', routerMovies);

router.use((req, res, next) => {
  next(new ErrorNotFound('Not found'));
});

module.exports = router;
