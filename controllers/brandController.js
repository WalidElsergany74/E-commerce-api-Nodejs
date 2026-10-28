const Brand = require('../models/brandModel');
const factory = require('./handlersFactory');

exports.getBrands = factory.getAll(Brand);

exports.createBrand = factory.createOne(Brand);

exports.getSingleBrand = factory.getOne(Brand);

exports.updateBrand = factory.updateOne(Brand);

exports.deleteBrand = factory.deleteOne(Brand);
