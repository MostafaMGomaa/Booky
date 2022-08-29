const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    review: String,
    rating: {
      type: Number,
      require: [true, 'A review must have a rate'],
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    book: {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
      require: [true, 'A review must belong to a book'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: [true, 'A review must belong to a book'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model('Review', reviewSchema);
