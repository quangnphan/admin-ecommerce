const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProduct,
} = require("../controllers/publicProducts");

router.route("/products").get(getAllProducts);

router.route("/products/:category?").get(getAllProducts);

router
  .route("/product/:id")
  .get(getProduct)

module.exports = router;
