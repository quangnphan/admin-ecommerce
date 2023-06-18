const express = require("express");
const router = express.Router();

const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProduct,
} = require("../controllers/products");

router.route("/products").post(createProduct).get(getAllProducts);

router
  .route("/product/:id")
  .get(getProduct)
  .delete(deleteProduct)
  .patch(updateProduct);

module.exports = router;
