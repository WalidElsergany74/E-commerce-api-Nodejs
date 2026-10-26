const { param, check } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');
const AppError = require('../utils/appError');
const CategoryModel = require('../models/categoryModel');
const SubCategoryModel = require('../models/subCategoryModel');

exports.getProductValidation = [
  param('id').isMongoId().withMessage('Invalid product id format'),
  validationMiddleware
];

const productFieldsValidation = () => [
  check('title')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2 })
    .withMessage('Product name is too short')
    .isLength({ max: 50 })
    .withMessage('Product name is too long'),

  check('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10 })
    .withMessage('Product description is too short')
    .isLength({ max: 800 })
    .withMessage('Product description is too long'),

  check('stock')
    .notEmpty()
    .withMessage('Product stock is required')
    .bail()
    .isInt({ min: 0 })
    .withMessage('Product stock must be a non-negative integer')
    .toInt(),

  check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('Product price must be a non-negative number')
    .toFloat(),

  check('priceAfterDiscount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Product price after discount must be a non-negative number')
    .toFloat()
    .custom((value, { req }) => {
      const price = Number(req.body.price);

      if (!Number.isFinite(price) || value >= price) {
        throw new Error('Price after discount must be less than price');
      }

      return true;
    }),

  check('imageCover')
    .notEmpty()
    .withMessage('Product image is required')
    .bail()
    .isString()
    .withMessage('Product image must be a string'),

  check('ratingsAvg')
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')
    .toFloat(),

  check('sold')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Product sold count must be a non-negative integer')
    .toInt(),

  check('ratingCount')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Product rating count must be a non-negative integer')
    .toInt(),

  check('images')
    .optional()
    .isArray()
    .withMessage('Product images must be an array'),

  check('images.*')
    .optional()
    .isString()
    .withMessage('Each product image must be a string'),

  check('colors')
    .optional()
    .isArray()
    .withMessage('Product colors must be an array'),

  check('colors.*')
    .optional()
    .isString()
    .withMessage('Each product color must be a string'),

  check('brand').optional().isMongoId().withMessage('Invalid brand ID format'),

  check('category')
    .notEmpty()
    .withMessage('Product must belong to a category')
    .bail()
    .isMongoId()
    .withMessage('Invalid category ID format')
    .bail()
    .custom(async (categoryId) => {
      const categoryExists = await CategoryModel.exists({
        _id: categoryId
      });

      if (!categoryExists) {
        throw new Error(`Category not found: ${categoryId}`);
      }

      return true;
    }),

  check('subcategory')
    .optional()
    .isArray()
    .withMessage('Product subcategory must be an array')
    .bail()
    .custom(async (subcategoryIds, { req }) => {
      if (new Set(subcategoryIds).size !== subcategoryIds.length) {
        throw new Error('Duplicate subcategory IDs are not allowed');
      }

      const subCategories = await SubCategoryModel.find({
        _id: { $in: subcategoryIds },
        category: req.body.category
      }).select('_id');

      if (subCategories.length !== subcategoryIds.length) {
        throw new Error(
          'One or more subcategories are invalid or do not belong to this category'
        );
      }

      return true;
    }),

  check('subcategory.*')
    .optional()
    .isMongoId()
    .withMessage('Invalid subcategory ID format')
];

exports.createProductValidation = [
  ...productFieldsValidation(),
  validationMiddleware
];

exports.updateProductValidation = [
  param('id').isMongoId().withMessage('Invalid product id format'),
  ...productFieldsValidation(),
  validationMiddleware
];

exports.deleteProductValidation = [
  param('id').isMongoId().withMessage('Invalid product id format'),
  validationMiddleware
];
