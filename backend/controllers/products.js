const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const Category = require("../models/Category");

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json({ categories, total: categories.length });
};

const getAllProducts = async (req, res) => {
  try {
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
    }).populate({
      path: 'created_by',
      select: 'name', // Include only the 'name' field from the User model
      options: { lean: false },
    });

    res.status(StatusCodes.OK).json({ products, total: products.length });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch products" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    }).populate('created_by', 'name').populate('category', 'name');
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
    }
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch product" });
  }
};

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  const productId = req.params.id; // Assuming the product ID is passed as a URL parameter
  const updatedFields = req.body; // Assuming the updated fields are sent in the request body

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) {
      // If the product with the specified ID does not exist, return an error
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
    }

    res.status(StatusCodes.OK).json(updatedProduct); // Return the updated product as the response
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove({
      _id: req.params.id,
    });
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
    }
    res.status(StatusCodes.OK).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
