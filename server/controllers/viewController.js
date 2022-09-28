const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Getting books data from collection.
  const webBooks = await Book.find({ categories: 'Web Development' });
  const programmingBooks = await Book.find({ categories: 'Programming' });
  const javaBooks = await Book.find({ categories: 'Java' });

  // 2) Build template.
  // 3) Render template using books data.
  res.status(200).render('overview', {
    title: 'Home',
    webBooks,
    programmingBooks,
    javaBooks,
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested book include reviews and relatedBooks.
  const book = await Book.findOne({ slug: req.params.slug }).populate({
    path: 'relatedBooks reviews',
    select: '-longDescription -__v -relatedBooks ',
  });

  if (!book) return next(new AppError(200, 'There is no book with that name.'));

  // 2) Build template .
  // 3) render temaplate using data.
  res.status(200).render('book', { title: book.title, book });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested Categorie's book.
  const books = await Book.find({ categories: req.params.cat });
  if (books.length === 0)
    return next(new AppError(200, 'There is no books in this categories.'));

  // 2) Build template .
  // 3) render temaplate using data.
  res.status(200).render('categories', {
    title: req.params.cat,
    books,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  //render template
  res.status(200).render('user', { title: 'Me' });
});

exports.login = catchAsync(async (req, res, next) => {
  //render template
  res.status(200).render('login', {
    title: 'Login',
  });
});
