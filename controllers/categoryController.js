const slugify = require('slugify');
const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError')

// @desc   Get all categories
// @route  GET /api/v1/categories
// @access public
exports.getCategories = asyncHandler(async (req , res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await Category.find().skip(skip).limit(limit);
    const total = await Category.countDocuments();
    res.status(200).json({
        status: 'success',
        results : categories.length,
            data : categories,
            pagination : {
            page,
            per_page : limit,
            total,
            totalPages: Math.ceil(total / limit),
            }
    })
});

// @desc   Create category 
// @route  POST /api/v1/categories
// @access private
exports.createCategory = asyncHandler(async (req,res) => {
    const { name } = req.body;
    const category = await Category.create({
    name,
    slug: slugify(name),
    });
    res.status(201).json({
    status: 'success',
    data: category,
    });
});

// @desc   Get single category 
// @route  GET /api/v1/categories/:id
// @access public
exports.getSingleCategory = asyncHandler(async(req,res , next) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if(!category) {
        return next(new AppError(`Not Found this id ${id}`))
    }
    res.status(200).json({
        status : 'success',
        data : category
    })
}) 

// @desc Update category
// @route PUT /api/v1/categories/:id
// @access private
exports.updateCategory = asyncHandler(async (req,res , next) => {
    const { id } = req.params;
    const { name  } = req.body;
    const updatedCategory = await  Category.findByIdAndUpdate(
        {_id : id},
        { name  , slug: slugify(name),},
        {new : true}
    )
        if(!updatedCategory) {
          return next(new AppError(`Not Found this id ${id}`))
    };
    
    res.status(200).json({
        status: 'success', 
        data : updatedCategory
    })

});

// @desc Delete category
// @route DELETE /api/v1/categories/:id
// @access private
exports.deleteCategory = asyncHandler(async (req,res , next) => {
    const { id } = req.params;
    const deleteCategory = await Category.findByIdAndDelete(id);
    if(!deleteCategory) {
        return next(new AppError(`Not Found this id ${id}`))
    };
    res.status(200).json({
        status : 'success',
        data : deleteCategory
    })
})