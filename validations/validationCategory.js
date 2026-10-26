const { param, check } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');

exports.getcategoryValidation = [
  param('id').isMongoId().withMessage('Invalid category id format'),
  validationMiddleware
];

exports.createCategoryValidation = [
  check('name')
    .notEmpty()
    .withMessage('category name is required')
    .isLength({ min: 3 })
    .withMessage('category name is too short')
    .isLength({ max: 32 })
    .withMessage('category name is too long'),
  validationMiddleware
];

exports.updateCategoryValidation = [
  param('id').isMongoId().withMessage('Invalid category id format'),
  check('name')
    .notEmpty()
    .withMessage('category name is required')
    .isLength({ min: 3 })
    .withMessage('category name is too short')
    .isLength({ max: 32 })
    .withMessage('category name is too long'),
  validationMiddleware
];

exports.deleteCategoryValidation = [
  param('id').isMongoId().withMessage('Invalid category id format'),
  validationMiddleware
];
