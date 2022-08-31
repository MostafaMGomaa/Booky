const router = require('express').Router();
const {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
  setRelatedBooks,
} = require('../controllers/bookController');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviewsRoutes');

router.use('/:bookId/reviews', reviewRouter);

router
  .route('/')
  .get(getAllBooks)
  .post(protect, restrictTo('admin', 'librarian'), createBook);

router.use(protect);

router
  .route('/:id')
  .get(getBook)
  .patch(restrictTo('admin', 'librarian'), updateBook)
  .delete(restrictTo('admin', 'librarian'), deleteBook);

router.post('/relatedBooks', setRelatedBooks);
module.exports = router;
