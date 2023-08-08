const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "customer",
        select: "first_name last_name email",
      })
      .populate({
        path: "products.product",
        select: "name colors sizes",
      })
      .exec();

      const filteredOrders = orders.map((order) => {
        const filteredProducts = order.products.map((product) => {
          const productData = {
            product: { _id: product.product._id.toString(), name: product.product.name },
            quantity: product.quantity,
            _id: product._id,
          };
  
          const { color, size, storage } = product;
          const colorId = color ? color.toString() : null;
          const sizeId = size ? size.toString() : null;
          const storageId = storage ? storage.toString() : null;
  
          // Find the selected color from the colors array
          if (product.product.colors && colorId) {
            const selectedColor = product.product.colors.find((color) => color._id.toString() === colorId);
            if (selectedColor) {
              productData.color = selectedColor;
            }
          }
  
          // Find the selected size from the sizes array
          if (product.product.sizes && sizeId) {
            const selectedSize = product.product.sizes.find((size) => size._id.toString() === sizeId);
            if (selectedSize) {
              productData.size = { size: selectedSize.size, _id: selectedSize._id };
              
              // Find the selected storage from the storages array within the selected size
              if (selectedSize.storages && storageId) {
                const selectedStorage = selectedSize.storages.find((storage) => storage._id.toString() === storageId);
                if (selectedStorage) {
                  productData.size.storages = [selectedStorage];
                }
              }
            }
          }
  
          return productData;
        });
  
        return {
          _id: order._id,
          customer: order.customer,
          products: filteredProducts,
          total_amount: order.total_amount,
          shipping_address: order.shipping_address,
          order_date: order.order_date,
          __v: order.__v,
        };
      });

    return res.status(StatusCodes.OK).json(filteredOrders);
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
