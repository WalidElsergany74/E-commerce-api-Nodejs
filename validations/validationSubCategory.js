const { param, check } = require('express-validator');
const validationMidddleware = require('../middlewares/validationMiddlewre');

exports.getSubCategoryValidation = [
  param('id').isMongoId().withMessage('Invalid SubCategory id format'),
  validationMidddleware
];

exports.createSubCategoryValidation = [
  check('name')
    .notEmpty()
    .withMessage('SubCategory name is required')
    .isLength({ min: 2 })
    .withMessage('SubCategory name is too short')
    .isLength({ max: 32 })
    .withMessage('SubCategory name is too long'),

  check('category')
    .notEmpty()
    .withMessage('Subcategory must be belongs category')
    .isMongoId()
    .withMessage('Invalid category id'),
  validationMidddleware
];

exports.updateSubCategoryValidation = [
  param('id').isMongoId().withMessage('Invalid SubCategory id format'),
  validationMidddleware
];

exports.deleteSubCategoryValidation = [
  param('id').isMongoId().withMessage('Invalid SubCategory id format'),
  validationMidddleware
];
