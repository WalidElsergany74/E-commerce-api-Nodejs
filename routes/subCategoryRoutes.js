const express = require('express');
const subCategoryController = require('../controllers/subCategoryController');
const {
  createSubCategoryValidation,
  updateSubCategoryValidation,
  deleteSubCategoryValidation
} = require('../validations/validationSubCategory');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    subCategoryController.subCategoryFilterObj,
    subCategoryController.getSubCategories
  )
  .post(
    subCategoryController.setBodyCategoryToReqBody,
    createSubCategoryValidation,
    subCategoryController.createSubCategory
  );

router
  .route('/:id')
  .get(subCategoryController.getSingleSubCategories)
  .put(subCategoryController.setBodyCategoryToReqBody,updateSubCategoryValidation, subCategoryController.updateCategory)
  .delete(deleteSubCategoryValidation, subCategoryController.deleteCategory);

module.exports = router;
