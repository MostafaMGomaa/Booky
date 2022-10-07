const stripe = require('stripe')(process.env.STRIPE_SECERT_KEY);
const Cart = require('../models/cartModel');
const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get user's cart by id.
  const book = await Book.findById(req.params.cartId);

  // 2) Create checkout session.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}`,
    cancel_url: `${req.protocol}://${req.get('host')}/cart/`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: 2000,
          product_data: {
            name: `${book.title} Book`,
            description: book.longDescription,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${
                book.slug
              }.jpeg`,
            ],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  // 3) Create a session as response
  res.status(200).json({
    status: 'success',
    session,
    data: {
      book,
    },
  });
});

exports.getAllCharts = getAll(Cart);
exports.getChart = getOne(Cart);
exports.createChart = createOne(Cart);

exports.updateChart = updateOne(Cart);
exports.deleteChart = deleteOne(Cart);
