const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  size: {
    type: [String],
    required: [true, "size cannot be empty"],
  },
  color: {
    type: [String],
    required: true,
  },
  storage: {
    type: [String],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: [String],
  }
});

module.exports = mongoose.model("Product", productSchema);
