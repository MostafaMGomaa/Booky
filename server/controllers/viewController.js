const Book = require('../models/bookModel');

const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Getting books data from collection.
  const books = await Book.find();

  // 2) Build template.
  // 3) Render template using books data.
  res.status(200).render('overview', {
    title: 'Home',
    books,
  });
});

exports.getBook = (req, res) => {
  res.status(200).render('book', { title: 'grokking algorthim' });
};
