const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({
        message: "Please provide token!!"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    const doesUserExist = await User.findById(decoded.id);

    if (!doesUserExist) {
      return res.status(404).json({
        message: "User doesn't exist with that token/id"
      });
    }

    req.user = doesUserExist 

    next();

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};