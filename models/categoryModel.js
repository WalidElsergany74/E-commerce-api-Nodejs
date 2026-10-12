const mongoose = require('mongoose');
// Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique :  [true , "Category must be unique"],
    minlength : [3, "Too short name"],
    maxlength : [32 , 'Too long category name']
  },
  slug : {
    type : String,
    lowercase : true
  },
  image : String,


}, {timestamps : true});

// Model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel