const User = require('../models/userModel');
const { getOne } = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    status: 'success',
    result: user.length,
    data: {
      user,
    },
  });
});

exports.getUser = getOne(User);

exports.deleteUser = (req, res, next) => {
  res.status(200).send('user has deleted');
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Throw error if user posts password data.
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        400,
        'You can not update password from here, try /updateMyPassword'
      )
    );
  }

  // 2)update user document
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
