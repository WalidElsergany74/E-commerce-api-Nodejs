const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await model.findByIdAndDelete(id);
    if (!doc) {
      return next(new AppError(`Not Found this id ${id}`));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!doc) {
      return next(new AppError(`Not Found this id ${req.params.id}`));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.getOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await model.findById(req.params.id);
    if (!doc) {
      return next(new AppError(`Not Found this id ${req.params.id}`));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.createOne = (model) =>
  asyncHandler(async (req, res) => {
    const doc = await model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc
    });
  });

exports.getAll = (model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObject) {
      filter = req.filterObject;
    }
    const countDocuments = await model.countDocuments();
    const apiFeature = new APIFeatures(model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination(countDocuments)
      .search();

    const docs = await apiFeature.mongooseQuery;
    const { pagination } = apiFeature;
    pagination.total = docs.length;

    res.status(200).json({
      status: 'success',
      data: docs,
      pagination: pagination
    });
  });
