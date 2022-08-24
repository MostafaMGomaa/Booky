const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove the password from output.
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  // Check if user try to signup as an admin.
  if (
    req.body.role !== undefined &&
    req.body.role !== 'user' &&
    req.body.role !== 'vendor'
  )
    return next(new AppError(400, `You cannot signup as ${req.body.role}`));

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    // passwordChangedAt: req.body.passwordChangedAt,
  });

  // Create Token.
  const token = signToken(newUser._id);

  // Send The response back
  createSendToken(newUser, 201, res);
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email , password is exist.
  if (!email || !password)
    return next(new AppError(400, 'Please provide email and password'));

  // 2) Check if user exist &  email , password is correct.
  const user = await User.findOne({ email }).select('+password');
  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct)
    return next(new AppError(401, 'Invalid email or password'));

  // 3) Send token to client.

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) Check if the token exsist.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError(401, 'You are not login.'));

  // 2) Verification the token.
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if the user still exist
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError(401, `There isn't user exist`));

  // 4) If user change password after the JWT was issused.
  if (user.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError(401, 'User recently changed password, please log in again')
    );
  }

  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role, roles);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, `This action is Not allowed as ${req.user.role}`)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError(400, 'There is not user with this email'));

  // 2) Genrate random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user Email.
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/resetPassword/${resetToken}`;

  const message = `Do patch req with new password and confirm it to ${resetUrl}.\nIf u didn't forget about this msg`;
  try {
    console.log('hello before sendemail ');
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });
    console.log(err);
    return next(
      new AppError(500, 'Error while sending email, try again later')
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token.
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired and, there's user, set new password.
  if (!user) {
    return next(new AppError(400, 'Token is invalid or expired!'));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 3) Update passwordChangedAt
  // 4) Log the user in and send JWT.
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get User from collection.
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if posted current password is correct.
  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    return next(new AppError(400, 'Current password is Wrong'));

  // 3) If so , update password.
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();

  // 4) Log user in , send JWT.

  createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {});
exports.isLoggedIn = (req, res, next) => {};
exports.resetToken = (req, res, next) => {};
