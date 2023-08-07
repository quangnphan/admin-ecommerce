const express = require("express");
const router = express.Router();

const {
  getAllOrders,
} = require("../controllers/orders");

router.route("/orders").get(getAllOrders)

module.exports = router;
