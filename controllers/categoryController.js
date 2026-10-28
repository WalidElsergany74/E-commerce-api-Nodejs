const Category = require('../models/categoryModel');
const factory = require('./handlersFactory');

// @desc   Get all categories
// @route  GET /api/v1/categories
// @access public
exports.getCategories = factory.getAll(Category);

// @desc   Create category
// @route  POST /api/v1/categories
// @access private
exports.createCategory = factory.createOne(Category);

// @desc   Get single category
// @route  GET /api/v1/categories/:id
// @access public
exports.getSingleCategory = factory.getOne(Category);

// @desc Update category
// @route PUT /api/v1/categories/:id
// @access private
exports.updateCategory = factory.updateOne(Category);

// @desc Delete category
// @route DELETE /api/v1/categories/:id
// @access private
exports.deleteCategory = factory.deleteOne(Category);
