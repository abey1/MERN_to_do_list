const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) => {
  //sign a token using user id
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30m" });
};

const checkToken = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ error: "User not authenticated" });
  }
  const token = authorization.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.SECRET);
    const result = await UserModel.findById({ _id: user._id });
    console.log(result);
    return res
      .status(200)
      .json({ user: { email: result.email, _id: result._id } });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  // get the email and password from request body
  const { email, password } = req.body;
  // try and login the user
  try {
    // get the user from database through the user model
    const user = await UserModel.login(email, password);
    //create a login token for the user
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { userLogin, userSignup, checkToken };
