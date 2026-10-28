const mongoose = require('mongoose');
// Schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product name is require'],
      trim: true,
      minLength: [2, 'Product name is too short'],
      maxLength: [100, 'Product name is too long']
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minLength: [10, 'Product description is too short'],
      maxLength: [800, 'Product Description is too long']
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      max: [200000, 'Too long product price']
    },
    priceAfterDiscount: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    imageCover: {
      type: String,
      required: [true, 'Product image is required']
    },
    ratingsAvg: {
      type: Number,
      min: [1, 'rating must be above or equal 1.0'],
      max: [5, 'rating must be below or equal 5.0']
    },
    ratingCount: {
      type: Number,
      default: 0
    },
    images: [String],
    colors: [String],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand'
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'product must be belongs to category']
    },

    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory'
      }
    ]
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

productSchema.pre(/^find/, function () {
  this.populate([
    {
      path: 'category',
      select: 'name'
    },
    {
      path: 'subcategories',
      select: 'name'
    },
    {
      path: 'brand',
      select: 'name'
    }
  ]);
});

module.exports = Product;
