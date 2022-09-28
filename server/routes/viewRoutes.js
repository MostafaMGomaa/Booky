const router = require('express').Router();
const {
  getOverview,
  getBook,
  getCategories,
  getMe,
  login,
} = require('../controllers/viewController');
const { isLoggedIn, protect } = require('../controllers/authController');

router.get('/', isLoggedIn, getOverview);
router.get('/book/:slug', isLoggedIn, getBook);
router.get('/categories/:cat', isLoggedIn, getCategories);
router.get('/me', protect, getMe);
router.get('/login', isLoggedIn, login);

module.exports = router;
