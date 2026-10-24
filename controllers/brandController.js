const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Brand = require('../models/brandModel');
const AppError = require('../utils/appError');

exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await Brand.find().skip(skip).limit(limit);
  const total = await Brand.countDocuments();

  res.status(200).json({
    status: 'success',
    results: brands.length,
    data: brands,
    pagination: {
      page,
      per_page: limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.create({
    name,
    slug: slugify(name)
  });

  res.status(201).json({
    status: 'success',
    data: brand
  });
});

exports.getSingleBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new AppError(`Not Found this id ${id}`));
  }

  res.status(200).json({
    status: 'success',
    data: brand
  });
});

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedBrand = await Brand.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!updatedBrand) {
    return next(new AppError(`Not Found this id ${id}`));
  }

  res.status(200).json({
    status: 'success',
    data: updatedBrand
  });
});

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedBrand = await Brand.findByIdAndDelete(id);
  if (!deletedBrand) {
    return next(new AppError(`Not Found this id ${id}`));
  }

  res.status(200).json({
    status: 'success',
    data: deletedBrand
  });
});
