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
    discountRate: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < 70;
        },
        message: 'Discount Rate should be below than 70%',
      },
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    publishedDate: Date,
    thumbnailUrl: {
      type: String,
      required: [true, 'Go back and bring photo'],
    },
    shortDescription: {
      type: String,
      default:
        'Pellentesque non mi sit amet nisl convallis ullamcorper a mollis quam. Aliquam vel justo eros. Donec pulvinar lectus vel scelerisque rutrum. Aliquam fermentum, magna a elementum ullamcorper, mauris quam pulvinar metus, non tempor tortor neque in leo. Morbi vehicula eget tortor sed cursus. Ut malesuada viverra pellentesque. Praesent tempor fringilla consequat. Etiam sed libero ante. Pellentesque nec massa id metus tempus porta at a est. In rutrum imperdiet tellus, in mattis erat dignissim sed.',
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

bookSchema.index({
  price: -1,
  ratingsAverage: 1,
});

bookSchema.index({
  slug: 1,
});

bookSchema.index({
  categories: 1,
});

bookSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'book',
  localField: '_id',
});

bookSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

bookSchema.pre('save', function (next) {
  const orignalPrice = (this.pageCount / 100) * 50;

  if (this.discountRate)
    this.price = orignalPrice - orignalPrice * (this.discountRate / 100);
  else this.price = orignalPrice - 0.1;
  this.price = this.price.toFixed(2);
  next();
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
