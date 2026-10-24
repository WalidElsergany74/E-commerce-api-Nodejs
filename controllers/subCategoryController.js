const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel');
const AppError = require('../utils/appError');

// @desc Create Subcategory by categoryId
// @route POST /api/v1/categories/:categoryId/subcategories
// @access private
exports.setBodyCategoryToReqBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

// @desc   Create subcategories
// @route  POST /api/v1/subcategories
// @access private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const newSubCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category
  });
  res.status(201).json({
    status: 'success',
    message: 'Create subcategory successfully',
    data: newSubCategory
  });
});

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

exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.page * 1 || 1;
  const limit = req.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subcategories = await SubCategory.find(req.filterObject)

    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name' });
  const total = await SubCategory.countDocuments();
  res.status(200).json({
    status: 'success',
    results: subcategories.length,
    data: subcategories,
    pagination: {
      page,
      per_page: limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// @desc   Get single subcategories
// @route  GET /api/v1/subcategories/:id
// @access public
exports.getSingleSubCategories = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const singleSubCategory = await SubCategory.findById(id).populate({
    path: 'category',
    select: 'name'
  });
  if (!singleSubCategory) {
    return next(new AppError(`not found sub category by this id : ${id}'`));
  }
  res.status(200).json({
    status: 'success',
    data: singleSubCategory
  });
});

// @desc Update subcategories
// @route PUT /api/v1/subcategories/:id
// @access private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const updatedCategory = await SubCategory.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!updatedCategory) {
    return next(new AppError(`Not Found this id ${id}`));
  }

  res.status(200).json({
    status: 'success',
    data: updatedCategory
  });
});

// @desc Delete subcategories
// @route DELETE /api/v1/subcategories/:id
// @access private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deleteCategory = await SubCategory.findByIdAndDelete(id);
  if (!deleteCategory) {
    return next(new AppError(`Not Found this id ${id}`));
  }
  res.status(200).json({
    status: 'success',
    data: deleteCategory
  });
});
