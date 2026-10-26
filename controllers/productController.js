const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// @desc   Get all products
// @route  GET /api/v1/products
// @access public
exports.getProducts = asyncHandler(async (req, res) => {
  // 1) Filtering
  // const queryObj = { ...req.query };
  // const excludeFields = ['page', 'sort', 'limit', 'fields'];
  // excludeFields.forEach((el) => delete queryObj[el]);
  // 2) Filtering by price, rating, etc.
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // const queryObjParsed = JSON.parse(queryStr);
  // 3) Pagination
  // const page = req.page * 1 || 1;
  // const limit = req.limit * 1 || 5;
  // const skip = (page - 1) * limit;
  // Build query
  // let mongooseQuery = Product.find(queryObjParsed)
  //   .skip(skip)
  //   .limit(limit)
  //   .populate({ path: 'category', select: 'name' });
  // 4) Sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   mongooseQuery = mongooseQuery.sort(sortBy);
  // } else {
  //   mongooseQuery = mongooseQuery.sort('-createdAt');
  // }
  // 5) Limiting fields
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(',').join(' ');
  //   mongooseQuery = mongooseQuery.select(fields);
  // } else {
  //   mongooseQuery = mongooseQuery.select('-__v');
  // }
  // 6) Searching by title and description
  // const escapeRegex = (value) =>
  // value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // if (req.query.keyword) {
  //   const query = {};
  //   const keyword = escapeRegex(req.query.keyword);
  //   query.$or = [
  //     { title: { $regex: keyword, $options: 'i' } },
  //     { description: { $regex: keyword, $options: 'i' } }
  //   ];
  //   mongooseQuery = mongooseQuery.find(query);
  // }
  // const total = await Product.countDocuments();
  // Execute query
  // const products = await mongooseQuery;
    const apiFeature = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination()
    .search();
    
  const products = await apiFeature.mongooseQuery;

  res.status(200).json({
    status: 'success',
    data: products,
    // pagination: {
    //   page,
    //   per_page: limit,
    //   total,
    //   totalPages: Math.ceil(total / limit)
    // }
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
  req.body.slug = slugify(req.body.title);
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
    req.body.slug = slugify(req.body.title);
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
