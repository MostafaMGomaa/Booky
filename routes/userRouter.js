const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  logout,
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

router.patch('/updateMyPassword', updatePassword);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
