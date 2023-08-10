const express = require("express");
const router = express.Router();

const { getPayments } = require("../controllers/listPayments");

router.route("/get_payments").get(getPayments);

module.exports = router;
