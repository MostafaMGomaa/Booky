const router = require('express').Router();
const {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require('../controllers/bookController');
const { protect, restrictTo } = require('../controllers/authController');

router
  .route('/')
  .get(protect, getAllBooks)
  .post(protect, restrictTo('admin', 'librarian'), createBook);
router
  .route('/:id')
  .get(getBook)
  .patch(protect, restrictTo('admin', 'librarian'), updateBook)
  .delete(protect, restrictTo('admin', 'librarian'), deleteBook);

module.exports = router;
