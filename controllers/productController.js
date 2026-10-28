const Product = require('../models/productModel');
const factory = require('./handlersFactory');

// @desc   Get all products
// @route  GET /api/v1/products
// @access public
exports.getProducts = factory.getAll(Product);

// @desc   Get single product
// @route  GET /api/v1/products/:id
// @access public
exports.getSingleProduct = factory.getOne(Product);
// @desc    Create product
// @route  Post /api/v1/products
// @access private
exports.createProduct = factory.createOne(Product);
// @desc   Get Create product
// @route  GET /api/v1/products
// @access private
exports.updateProduct = factory.updateOne(Product);
// @desc Delete product
// @route DELETE /api/v1/product/:id
// @access private
exports.deleteProduct = factory.deleteOne(Product);
