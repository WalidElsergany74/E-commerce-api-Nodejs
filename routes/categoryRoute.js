const express = require('express');
const categoryController = require('../controllers/categoryController');
const {
  updateCategoryValidation,
  deleteCategoryValidation,
  getcategoryValidation,
  createCategoryValidation
} = require('../validations/validationCategory');
const subCategoryRouter = require('./subCategoryRoutes');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getCategories)
  .post(createCategoryValidation, categoryController.createCategory);

router.use('/:categoryId/subcategories', subCategoryRouter);

router
  .route('/:id')
  .get(getcategoryValidation, categoryController.getSingleCategory)
  .put(updateCategoryValidation, categoryController.updateCategory)
  .delete(deleteCategoryValidation, categoryController.deleteCategory);

module.exports = router;
