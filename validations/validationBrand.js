const { param, check, body } = require('express-validator');
const slugify = require('slugify');
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
    .withMessage('Brand name is too long')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('image')
    .optional()
    .isString()
    .withMessage('Brand image must be a string'),
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
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check('image')
    .optional()
    .isString()
    .withMessage('Brand image must be a string'),
  validationMiddleware
];

exports.deleteBrandValidation = [
  param('id').isMongoId().withMessage('Invalid brand id format'),
  validationMiddleware
];
