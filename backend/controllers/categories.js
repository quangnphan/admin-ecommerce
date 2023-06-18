const { StatusCodes } = require("http-status-codes");
const Category = require("../models/category");

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  console.log(categories)
  res.status(StatusCodes.OK).json({ categories, total: categories.length });
};

module.exports = { getCategories };
