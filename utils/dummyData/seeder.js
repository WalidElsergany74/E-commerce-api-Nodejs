require('colors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const slugify = require('slugify');

dotenv.config({ path: '.env' });

const Category = require('../../models/categoryModel');
const SubCategory = require('../../models/subCategoryModel');
const Brand = require('../../models/brandModel');
const Product = require('../../models/productModel');
const dbConnection = require('../../config/database');
const { categories, brands, products } = require('./data');

// connect to DB
dbConnection();

const destroyAll = async () => {
  await Product.deleteMany();
  await SubCategory.deleteMany();
  await Category.deleteMany();
  await Brand.deleteMany();
};

// Insert data into DB
const insertData = async () => {
  try {
    await destroyAll();

    // 1) Categories
    const createdCategories = await Category.insertMany(
      categories.map(({ name }) => ({
        name,
        slug: slugify(name),
        image: `https://picsum.photos/seed/${slugify(name)}/600/400`
      }))
    );
    // eslint-disable-next-line node/no-unsupported-features/es-builtins
    const categoryIds = Object.fromEntries(
      createdCategories.map((c) => [c.name, c._id])
    );

    // 2) Subcategories (linked to their category _id)
    const createdSubCategories = await SubCategory.insertMany(
      categories.flatMap(({ name, subcategories }) =>
        subcategories.map((sub) => ({
          name: sub,
          slug: slugify(sub),
          category: categoryIds[name]
        }))
      )
    );
    const subCategoryIds = Object.fromEntries(
      createdSubCategories.map((s) => [s.name, s._id])
    );

    // 3) Brands
    const createdBrands = await Brand.insertMany(
      brands.map((name) => ({
        name,
        slug: slugify(name),
        image: `https://picsum.photos/seed/brand-${slugify(name)}/400/400`
      }))
    );
    const brandIds = Object.fromEntries(
      createdBrands.map((b) => [b.name, b._id])
    );

    // 4) Products (category, subcategories and brand resolved to _id)
    const createdProducts = await Product.insertMany(
      products.map(({ subcategories, ...p }) => ({
        ...p,
        slug: slugify(p.title),
        category: categoryIds[p.category],
        brand: brandIds[p.brand],
        subcategories: subcategories.map((s) => subCategoryIds[s])
      }))
    );

    console.log(
      `Data Inserted: ${createdCategories.length} categories, ${createdSubCategories.length} subcategories, ${createdBrands.length} brands, ${createdProducts.length} products`
        .green.inverse
    );
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await destroyAll();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// node utils/dummyData/seeder.js -i | -d
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
} else {
  mongoose.disconnect();
}
