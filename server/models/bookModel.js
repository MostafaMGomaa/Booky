const mongoose = require('mongoose');
const slugify = require('slugify');

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
    publishedDate: Date,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: {
      type: String,
      default: 'PUBLISH',
      enum: ['PUBLISH', 'NOT PUBLISH'],
    },
    authors: {
      type: [String],
      require: [true, 'A Book must have at least an author'],
    },
    categories: [String],
    slug: String,
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

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
