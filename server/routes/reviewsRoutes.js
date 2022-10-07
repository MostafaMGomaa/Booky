const router = require('express').Router({ mergeParams: true });
const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setBookUserIds,
} = require('../controllers/reviewsController');

const { restrictTo, protect } = require('../controllers/authController');

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setBookUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
