const createPayment = async (stripeAPI, amount) => {
  try {
    const paymentIntent = await stripeAPI.paymentIntents.create({
      amount: (amount * 100).toFixed(0),
      currency: "usd",
    });
    return paymentIntent;
  } catch (e) {
    console.error(`Failure to create payment: ${e}`);
    return { error: e.message };
  }
};

module.exports = createPayment;
