const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    status: 'success',
    result: user.length,
    data: {
      user,
    },
  });
});

const getUser = (req, res, next) => {
  res.status(200).send('One user');
};
const createUser = (req, res, next) => {
  res.status(201).send('New user created');
};
const updateUser = (req, res, next) => {
  res.status(200).send('User has updated');
};
const deleteUser = (req, res, next) => {
  res.status(200).send('user has deleted');
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
