const stripe = require("stripe");
const { StatusCodes } = require("http-status-codes");

const stripeAPI = stripe(process.env.STRIPE_SECRET_KEY);

const getPayments = async (req, res) => {
    try {
        const paymentIntents = await stripeAPI.paymentIntents.list({
            limit: 10,
        });
        res.status(StatusCodes.OK).json(paymentIntents.data);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error fetching payments",
        });
    }
};

module.exports = {
    getPayments
}
