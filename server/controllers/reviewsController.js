const Review = require('../models/reviewModel');

const {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} = require('./handlerFactory');

exports.setBookUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.book) req.body.book = req.params.bookId || req.params.id;
  next();
};

exports.getAllReviews = getAll(Review);
exports.getReview = getOne(Review);
exports.createReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
