const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const Category = require("../models/Category");

const getAllProducts = async (req, res) => {
  try {
    let filter = {};

    // Check if a category is specified in the URL
    if (req.params.category) {
      const category = await Category.findOne({
        name: { $regex: new RegExp("^" + req.params.category, "i") },
      });
      // If the category does not exist, return an error
      if (!category) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Category not found" });
      }
      filter = { category: category._id };
    }

    // Check if a search query is provided in the request
    const searchQuery = req.query.search;

    if (searchQuery) {
      // If a search query is provided, create a regular expression for case-insensitive search
      const searchRegex = new RegExp(searchQuery, "i");
      filter.name = searchRegex; // Replace 'name' with the field you want to search
    }

    // Populate data from another collection and apply category and search filter
    const products = await Product.find(filter)
      .populate({
        path: "category",
        options: { lean: false },
      })
      .populate({
        path: "created_by",
        select: "name",
        options: { lean: false },
      });

    res.status(StatusCodes.OK).json({ products, total: products.length });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch products" });
  }
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
