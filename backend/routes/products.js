const express = require("express");
const router = express.Router();

const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  getCategories,
} = require("../controllers/products");

router.route("/products").post(createProduct).get(getAllProducts);

router
  .route("/product/:id")
  .get(getProduct)
  .delete(deleteProduct)
  .patch(updateProduct);

router.route("/categories").get(getCategories);

module.exports = router;
