const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const Category = require("../models/Category");

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json({ categories, total: categories.length });
};

const getAllProducts = async (req, res) => {
  let categoryFilter = {};
  // Check if a category is specified in the URL
  if (req.params.category) {
    const category = await Category.findOne({ name: { $regex: new RegExp('^' + req.params.category, 'i') } });
    // If the category does not exist, return an error
    if (!category) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Category not found' });
    }
    
    categoryFilter = { category: category._id };
  }

  // Populate data from another collection and apply category filter
  const products = await Product.find(categoryFilter).populate({
    path: 'category',
    options: { lean: false },
  });

  res.status(StatusCodes.OK).json({ products, total: products.length });
};

const getProduct = async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
  });
  if (!product) {
    throw new Error(`No product found!`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  res.send("update product");
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndRemove({
    _id: req.params.id,
  });
  if (!product) {
    throw new Error(`No product found!`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
