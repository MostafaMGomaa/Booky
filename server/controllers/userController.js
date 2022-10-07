const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/userModel');
const { getOne } = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const multerStroage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/user');
//   },
//   // user-userid-timestamp.jpeg
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStroage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError(400, 'Not an image please upload and image'), false);
};

const upload = multer({ storage: multerStroage, fileFilter: multerFilter });

exports.resizeUserPhoto = (req, res, next) => {
  console.log('In resizeUserPhoto');
  if (!req.file) return next();
  console.log('In After if');

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  console.log('filename:', req.file.filename);

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/user/${req.file.filename}`);

  next();
};

exports.uploadUserPhoto = upload.single('photo');

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

exports.getUser = getOne(User, {
  path: 'cart',
  select: ' -__v',
});

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
  const filterObj = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.file) filterObj.photo = req.file.filename;

  // 2)update user document
  const user = await User.findByIdAndUpdate(req.user.id, filterObj, {
    new: true,
    runValidators: true,
  });

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
