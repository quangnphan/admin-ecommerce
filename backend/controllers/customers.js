const { StatusCodes } = require("http-status-codes");
const Customer = require("../models/Customer");

const getAllCustomers = async (req,res) => {
    try {
        const users = await Customer.find();
        res.status(StatusCodes.OK).json(users);
      } catch (error) {
        console.error(error);
        // Check if the error is related to database operations
        if (error.name === "MongoError" || error.name === "CastError") {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database Error" });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Error" });
      }
}

module.exports = {getAllCustomers}