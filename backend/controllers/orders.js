const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const Customer = require("../models/Customer");

const createOrder = async (req, res) => {
  // Extract relevant data from the request body
  const {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    city,
    state,
    zipcode,
    products,
    total_amount,
    shipping_address,
  } = req.body;

  // Create an array of product objects
  const productsArray = products.map((product) => ({
    product: product.productId,
    size: product.modelId,
    color: product.colorId,
    storage: product.storageId,
    quantity: product.quantity,
  }));

  // Check if the customer already exists by email
  const existingCustomer = await Customer.findOne({ email });

  if (existingCustomer) {
    // Customer already exists, create a new order for the existing customer
    const order = new Order({
      customer: existingCustomer._id,
      products: productsArray,
      total_amount: total_amount,
      shipping_address: shipping_address,
    });

    // Save the order
    await order.save();

    // Return the order or any other response as needed
    return res.status(StatusCodes.CREATED).json({ order });
  }

  // Customer does not exist, create a new customer and order
  const newCustomer = new Customer({
    first_name,
    last_name,
    email,
    phone_number,
    address,
    city,
    state,
    zipcode,
  });

  // Save the new customer record
  await newCustomer.save();

  // Create the order for the new customer
  const order = new Order({
    customer: newCustomer._id,
    products: productsArray,
    total_amount: total_amount,
    shipping_address: shipping_address,
  });

  // Save the order
  await order.save();

  res.status(StatusCodes.CREATED).json({ order });
};

module.exports = {
  createOrder,
};
