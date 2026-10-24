const express = require('express');
const brandController = require('../controllers/brandController');
const {
  updateBrandValidation,
  deleteBrandValidation,
  getBrandValidation,
  createBrandValidation
} = require('../validations/validationBrand');

const router = express.Router();

router
  .route('/')
  .get(brandController.getBrands)
  .post(createBrandValidation, brandController.createBrand);

router
  .route('/:id')
  .get(getBrandValidation, brandController.getSingleBrand)
  .put(updateBrandValidation, brandController.updateBrand)
  .delete(deleteBrandValidation, brandController.deleteBrand);

module.exports = router;
