const mongoose = require('mongoose');

const cartItem = mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    require: [true, 'A Cart item must be a belong to book'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'A Cart item must be a belong to user'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

cartItem.pre(/^find/, function (next) {
  this.populate({
    path: 'book',
    select:
      'title price discountRate shortDescription longDescription status slug',
  });
  next();
});
const Cart = mongoose.model('Cart', cartItem);
module.exports = Cart;
