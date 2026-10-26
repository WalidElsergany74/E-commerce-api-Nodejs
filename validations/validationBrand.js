const { param, check } = require('express-validator');
const validationMiddleware = require('../middlewares/validationMiddleware');

exports.getBrandValidation = [
  param('id').isMongoId().withMessage('Invalid brand id format'),
  validationMiddleware
];

exports.createBrandValidation = [
  check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ min: 3 })
    .withMessage('Brand name is too short')
    .isLength({ max: 32 })
    .withMessage('Brand name is too long'),
  validationMiddleware
];

exports.updateBrandValidation = [
  param('id').isMongoId().withMessage('Invalid brand id format'),
  check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ min: 3 })
    .withMessage('Brand name is too short')
    .isLength({ max: 32 })
    .withMessage('Brand name is too long'),
  validationMiddleware
];

exports.deleteBrandValidation = [
  param('id').isMongoId().withMessage('Invalid brand id format'),
  validationMiddleware
];
