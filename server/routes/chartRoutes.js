const router = require('express').Router();

const {
  getAllCharts,
  getChart,
  createChart,
  updateChart,
  deleteChart,
} = require('../controllers/chartController');
const { protect, restrictTo } = require('../controllers/authController');

router.use(protect);
router.use(restrictTo('admin'));

router.route('/').get(getAllCharts).post(createChart);

router.use(protect);

router.route('/:id').get(getChart).patch(updateChart).delete(deleteChart);
