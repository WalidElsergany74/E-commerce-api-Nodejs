const mongoose = require('mongoose');

// Schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subcategory name is required'],
      unique: [true, 'SubCategory must be unique'],
      trim: true,
      minlength: [2, 'Too short name'],
      maxlength: [32, 'Too long  name']
    },
    slug: {
      type: String,
      lowercase: true
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'subcategory must be belongs to category']
    }
  },
  { timestamps: true }
);

// Model
const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategoryModel;
