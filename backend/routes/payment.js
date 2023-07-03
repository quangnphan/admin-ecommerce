const express = require("express");
const router = express.Router();

const { postPayment } = require("../controllers/payment");

router.route("/post_payment").post(postPayment);

module.exports = router;
