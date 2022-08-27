const mongoose = require('mongoose');

const chartItem = mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    require: [true, 'A Chart item must be a belong to book'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    require: [true, 'A Chart item must be a belong to user'],
  },
  price: {
    type: Number,
    required: [true, 'A chart Item must have a price'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});
