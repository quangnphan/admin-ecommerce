const mongoose = require("mongoose");

const storageOptionSchema = new mongoose.Schema({
  capacity: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const sizeOptionSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  storages: {
    type: [storageOptionSchema],
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  sizes: {
    type: [sizeOptionSchema],
    required: [true, "sizes cannot be empty"],
  },
  color: {
    type: [String],
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: [String],
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", productSchema);