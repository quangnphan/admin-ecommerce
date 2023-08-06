const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find().select("name email"); // Select only 'name' and 'email' fields
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

module.exports = {getAllUsers}