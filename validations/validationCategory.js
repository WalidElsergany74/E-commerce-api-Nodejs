const { param, check, body } = require('express-validator');
const slugify = require('slugify');
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
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check('image')
    .optional()
    .isString()
    .withMessage('category image must be a string'),
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
    .withMessage('category name is too long')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('image')
    .optional()
    .isString()
    .withMessage('category image must be a string'),
  validationMiddleware
];

exports.deleteCategoryValidation = [
  param('id').isMongoId().withMessage('Invalid category id format'),
  validationMiddleware
];
