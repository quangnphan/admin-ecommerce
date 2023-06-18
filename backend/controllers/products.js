const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  res.send("all products");
};

const getProduct = async (req, res) => {
    console.log(res)
    console.log(req)
  res.send("single product");
};

const createProduct = async (req, res) => {
  res.send("create product");
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
