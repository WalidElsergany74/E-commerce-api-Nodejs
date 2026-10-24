const { param, check } = require('express-validator');
const validationMidddleware = require('../middlewares/validationMiddlewre');

exports.getcategoryValidation = [
  param('id').isMongoId().withMessage('Invalid category id format'),
  validationMidddleware
];

exports.createCategoryValidation = [
  check('name')
    .notEmpty()
    .withMessage('category name is required')
    .isLength({ min: 3 })
    .withMessage('category name is too short')
    .isLength({ max: 32 })
    .withMessage('category name is too long'),
  validationMidddleware
];

exports.updateCategoryValidation = [
  param('id').isMongoId().withMessage('Invalid category id format'),
  validationMidddleware
];

exports.deleteCategoryValidation = [
  param('id').isMongoId().withMessage('Invalid category id format'),
  validationMidddleware
];
