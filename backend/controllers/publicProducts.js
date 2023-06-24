const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const Category = require('../models/Category');

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

module.exports = {
  getAllProducts,
  getProduct,
};
