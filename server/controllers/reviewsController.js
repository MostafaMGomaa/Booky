const Review = require('../models/reviewModel');

const {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} = require('./handlerFactory');

exports.getAllReviews = getAll(Review);
exports.getReview = getOne(Review);
exports.createReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
