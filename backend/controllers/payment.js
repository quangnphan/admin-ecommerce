const stripe = require("stripe");
const { StatusCodes } = require("http-status-codes");

const createPayment = require("../middleware/payment");

const stripeAPI = stripe(process.env.STRIPE_SECRET_KEY);

exports.postPayment = async (req, res, next) => {
  try {
    const { total } = req.body;

    const paymentIntent = await createPayment(stripeAPI, total);

    res
      .status(StatusCodes.CREATED)
      .json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: e.message });
  }
};
