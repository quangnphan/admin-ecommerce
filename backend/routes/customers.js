const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
} = require("../controllers/customers");

router.route("/customers").get(getAllCustomers)

module.exports = router;
