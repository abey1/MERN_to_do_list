const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.login = async function (email, password) {
  // check if email and password are both present
  if (!email || !password) {
    throw Error("Email and password required");
  }
  // if both the checks are passed try and find check if the user exists
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("The user does not exist in the database");
  }
  //compare password with the saved password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Your password is incorrect");
  }

  // if all the checks are passed return the found user
  return user;
};

userSchema.statics.signup = async function (email, password) {
  // check if email and password is present
  if (!email || !password) {
    throw Error("Email and password required");
  }
  // check if email is valid
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  // check password id strong
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  // check if email exists
  const user = await this.findOne({ email });
  if (user) {
    throw Error("Email already exists");
  }

  // if all the checks are passed bcrypt password and create user and return it
  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(password, salt);
  const newUser = await this.create({ email, password: securePassword });
  return newUser;
};

module.exports = mongoose.model("UserModel", userSchema);
