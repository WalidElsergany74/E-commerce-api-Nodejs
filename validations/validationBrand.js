const { param, check } = require('express-validator');
const validationMidddleware = require('../middlewares/validationMiddlewre');

exports.getBrandValidation = [
  param('id').isMongoId().withMessage('Invalid brand id format'),
  validationMidddleware
];

exports.createBrandValidation = [
  check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ min: 3 })
    .withMessage('Brand name is too short')
    .isLength({ max: 32 })
    .withMessage('Brand name is too long'),
  validationMidddleware
];

exports.updateBrandValidation = [
  param('id').isMongoId().withMessage('Invalid brand id format'),
  validationMidddleware
];

exports.deleteBrandValidation = [
  param('id').isMongoId().withMessage('Invalid brand id format'),
  validationMidddleware
];
