const express = require('express');
const productController = require('../controllers/productController');
const {
  getProductValidation,
  createProductValidation,
  updateProductValidation,
  deleteProductValidation
} = require('../validations/productValidation');

const router = express.Router();

router
  .route('/')
  .get(productController.getProducts)
  .post(createProductValidation, productController.createProduct);

router
  .route('/:id')
  .get(getProductValidation, productController.getSingleProduct)
  .put(updateProductValidation, productController.updateProduct)
  .delete(deleteProductValidation, productController.deleteProduct);

module.exports = router;
