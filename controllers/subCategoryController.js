const SubCategory = require('../models/subCategoryModel');
const factory = require('./handlersFactory');

// @desc Create Subcategory by categoryId
// @route POST /api/v1/categories/:categoryId/subcategories
// @access private
exports.setBodyCategoryToReqBody = (req, res, next) => {
  req.body = req.body || {};
  if (!req.body.category && req.params.categoryId) {
    req.body.category = req.params.categoryId;
  }
  next();
};

// @desc   Get all subcategories
// @route  GET /api/v1/subcategories
// @access public
// @desc   Get Subcategories by categoryId
// @route  GET /api/v1/categories/:categoryId/subcategories
// @access public

exports.subCategoryFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  req.filterObject = filterObject;
  next();
};

exports.getSubCategories = factory.getAll(SubCategory);
// @desc   Create subcategories
// @route  POST /api/v1/subcategories
// @access private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc   Get single subcategories
// @route  GET /api/v1/subcategories/:id
// @access public
exports.getSingleSubCategories = factory.getOne(SubCategory);

// @desc Update subcategories
// @route PUT /api/v1/subcategories/:id
// @access private
exports.updateCategory = factory.updateOne(SubCategory);

// @desc Delete subcategories
// @route DELETE /api/v1/subcategories/:id
// @access private
exports.deleteCategory = factory.deleteOne(SubCategory);
