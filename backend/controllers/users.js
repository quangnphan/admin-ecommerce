const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email"); // Select only 'name' and 'email' fields
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error(error);
    // Check if the error is related to database operations
    if (error.name === "MongoError" || error.name === "CastError") {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Database Error" });
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the provided user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid user ID" });
    }

    // Attempt to find and delete the user
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    res
      .status(StatusCodes.OK)
      .json({ user: deletedUser, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid user ID" });
    }

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to delete user" });
  }
};

module.exports = { getAllUsers, deleteUser };
