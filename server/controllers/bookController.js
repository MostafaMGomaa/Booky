const Book = require('../models/bookModel');
const {
  getAll,
  getOne,
  createOne,
  upadateOne,
  deleteOne,
} = require('./handlerFactory');

exports.getAllBooks = getAll(Book);
exports.getBook = getOne(Book);
exports.createBook = createOne(Book);
exports.updateBook = upadateOne(Book);
exports.deleteBook = deleteOne(Book);
