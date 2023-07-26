const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please provide email and password" });
    }
    
    const user = await User.findOne({ email }).select("+password"); // Include the password field in the query
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid Credentials" });
    }
    
    const isPasswordCorrect = await user.comparePassword(password);
  
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid Credentials" });
    }
    
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } catch (error) {
    console.error(error);
    // Check if the error is related to database operations
    if (error.name === "MongoError" || error.name === "CastError") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database Error" });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Error" });
  }
};

module.exports = {
  register,
  login,
};
