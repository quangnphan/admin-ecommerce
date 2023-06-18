const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  //populate data from another collection
  const products = await Product.find({}).populate({
    path: "category",
    options: { lean: false },
  });
  res.status(StatusCodes.OK).json({ products, total: products.length });
};

const getProduct = async (req, res) => {
  res.send("single product");
};

const createProduct = async (req, res) => {
  // req.body.createdBy = req.user.userId
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  res.send("update product");
};

const deleteProduct = async (req, res) => {
  res.send("delete product");
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
