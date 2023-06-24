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
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model("Order", orderSchema);
