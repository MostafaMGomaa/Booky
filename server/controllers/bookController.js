const Book = require('../models/bookModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getAll, getOne, createOne, upadateOne } = require('./handlerFactory');
const {
  setAllRelatedBook,
  deleteRelatedBooks,
} = require('../utils/relatedBook');

exports.getAllBooks = getAll(Book);
exports.getBook = getOne(Book);
exports.createBook = createOne(Book);
exports.updateBook = upadateOne(Book);

exports.deleteBook = catchAsync(async (req, res, next) => {
  const books = await Book.find();
  const currentBook = await Book.findById(req.params.id);

  if (!currentBook)
    return next(new AppError(404, `Cannot find any result with this ID`));

  deleteRelatedBooks(books, currentBook);
  // await book.deleteOne();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Create this method to modfiy my data.
exports.setRelatedBooks = catchAsync(async (req, res, next) => {
  setAllRelatedBook();

  res.status(200).json({
    status: 'success',
    message: 'Alright',
  });
});
