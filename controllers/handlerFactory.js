const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Excute the query
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limit()
      .pagnation();

    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: {
        doc,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc)
      return next(new AppError(404, `Cannot find any result with this ID`));

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    // SEND RESPONSE
    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.upadateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc)
      return next(new AppError(404, `Cannot find any result with this ID`));

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc)
      return next(new AppError(404, `Cannot find any result with this ID`));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
