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

const colorSchema = new mongoose.Schema({
  hex: {
    type: String,
    required: true,
  },
  des: {
    type: String,
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

const inTheBoxSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})

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
  colors: {
    type: [colorSchema],
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
  out_of_stock: {
    type: Boolean,
    required: true,
  },
  images: {
    type: [String],
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  in_the_box: {
    type: [inTheBoxSchema],
    required: true
  },
});

module.exports = mongoose.model("Product", productSchema);
