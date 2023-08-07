const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "customer",
      select: "first_name last_name email",
    })
    .populate({
        path: "products.product",
        select: "name colors sizes",
        populate: [
          {
            path: "colors",
            select: "hex des",
          },
          {
            path: "sizes",
            select: "size storages",
            populate: {
              path: "storages",
              select: "capacity",
            },
          },
        ],
      });

    return res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Failed to get orders",
    });
  }
};

module.exports = {
  getAllOrders,
};
