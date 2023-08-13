const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignup,
  checkToken,
} = require("../controllers/userController");

//check login
router.post("/check_login", checkToken);

//login route
router.post("/login", userLogin);

//signup route
router.post("/signup", userSignup);

module.exports = router;
