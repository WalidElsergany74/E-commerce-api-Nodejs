const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');

// @desc   Get all products
// @route  GET /api/v1/products
// @access public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.page * 1 || 1;
  const limit = req.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name' });
  const total = await Product.countDocuments();
  res.status(200).json({
    status: 'success',
    data: products,
    pagination: {
      page,
      per_page: limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});
// @desc   Get single product
// @route  GET /api/v1/products/:id
// @access public
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: 'category',
    select: 'name'
  });
  if (!product) {
    return next(new AppError(`Not found product by this id : ${id}`));
  }
  res.status(200).json({
    status: 'success',
    data: product
  });
});
// @desc    Create product
// @route  Post /api/v1/products
// @access private
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = req.body.title;
  const product = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: product
  });
});
// @desc   Get Create product
// @route  GET /api/v1/products
// @access private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  if (req.body.title) {
    req.body.slug = req.body.title;
  }
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(
    {
      _id: id
    },
    req.body,
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    data: updatedProduct
  });
});
// @desc Delete product
// @route DELETE /api/v1/product/:id
// @access private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(id);
  if (!deleteProduct) {
    return next(new AppError(`Not Found this id ${id}`));
  }
  res.status(200).json({
    status: 'success',
    data: deleteProduct
  });
});
