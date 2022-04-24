const router = require('express').Router();
const validation = require('../middlewares/validation');
const { getCurrentUsers, updateUserInfo } = require('../controllers/users');

router.get('/me', getCurrentUsers);
router.patch('/me', validation.checkUserInfo, updateUserInfo);

module.exports = router;
