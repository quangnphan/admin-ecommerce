const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "category name must be provided"],
  },
});

module.exports = mongoose.model("Category", categorySchema);