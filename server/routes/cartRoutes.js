const router = require('express').Router({ mergeParams: true });
const {
  getAllCharts,
  getChart,
  createChart,
  updateChart,
  deleteChart,
  getCheckoutSession,
} = require('../controllers/cartController');
const { protect, restrictTo } = require('../controllers/authController');
const { setBookUserIds } = require('../controllers/reviewsController');

router.use(protect);
router.get('/checkout-session/:cartId', getCheckoutSession);

router.route('/').get(getAllCharts).post(restrictTo('user'), createChart);

router
  .route('/:id')
  .get(getChart)
  .post(restrictTo('user'), setBookUserIds, createChart)
  .patch(updateChart)
  .delete(deleteChart);

module.exports = router;
