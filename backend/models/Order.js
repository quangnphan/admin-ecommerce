const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  });

  const orderSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: {
      type: [productSchema],
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model("Order", orderSchema);
