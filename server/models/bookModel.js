const mongoose = require('mongoose');
const slugify = require('slugify');
const catchAsync = require('../utils/catchAsync');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A Book must have a Title'],
      trim: true,
      unique: true,
    },
    isbn: {
      type: String,
      required: [true, 'A Book must have an ISBN'],
      unique: true,
    },
    pageCount: {
      type: Number,
      required: [true, 'A Book must have a number of Pages '],
    },
    price: Number,
    discountRate: {
      type: Number,
      default: 0,
    },
    publishedDate: Date,
    thumbnailUrl: String,
    shortDescription: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at dolor et quam hendrerit ultrices. In laoreet dignissim nisi, eu porttitor ipsum pellentesque',
    },
    longDescription: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at dolor et quam hendrerit ultrices. In laoreet dignissim nisi, eu porttitor ipsum pellentesque ut. Nullam dui nibh, auctor eu sapien sed, aliquet consectetur dui. Donec maximus feugiat tellus, porta imperdiet magna. Sed massa magna, semper nec lobortis quis, consectetur in ex. Praesent venenatis feugiat consequat. Nam imperdiet eget nibh ut imperdiet. In aliquam ante dui, et vestibulum nunc ullamcorper a. Vestibulum bibendum et nisl in convallis. Nullam sit amet mauris semper, volutpat elit vel, scelerisque leo.',
    },
    status: {
      type: String,
      default: 'PUBLISH',
      enum: ['PUBLISH', 'MEAP'],
    },
    authors: {
      type: [String],
      require: [true, 'A Book must have at least an author'],
    },
    categories: [String],
    slug: String,
    relatedBooks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

bookSchema.pre('save', function (next) {
  const orignalPrice = Math.round((this.pageCount / 100) * 10 * 1.2) + 0.99;
  this.price = orignalPrice * (this.discountRate / 100);
  next();
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
