const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const Category = require('../models/Category');

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json({ categories, total: categories.length });
};

const getAllProducts = async (req, res) => {
  //populate data from another collection
  const products = await Product.find({}).populate({
    path: "category",
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
  req.body.createdBy = req.user.userId
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
