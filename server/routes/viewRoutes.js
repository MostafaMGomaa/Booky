const router = require('express').Router();
const { getOverview, getBook } = require('../controllers/viewController');

router.get('/', getOverview);

router.get('/book', getBook);

module.exports = router;
