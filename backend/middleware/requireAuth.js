const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../models/userModel");

const checkAuth = async (req, res, next) => {
  //get the authentication from request header
  const { authorization } = req.headers;
  // check if authentication exists if not return authorization required error
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  // token is like Bearer <Token> remove the Bearer and get the token
  const token = authorization.split(" ")[1];
  console.log("token = ", token);

  try {
    // try to verify and get the value given to it when signing the token
    const { _id } = jwt.verify(token, process.env.SECRET);

    // find the user from the database with the id _id
    const user = await UserModel.findOne({ _id });

    //check if the user exists
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // assign the found user to the req.user
    console.log("user = ", user);

    req.user = user;
    // go to the next routes
    next();
  } catch (error) {
    res.status(400).json({ error: "request is not authorized" });
  }
};

module.exports = checkAuth;
