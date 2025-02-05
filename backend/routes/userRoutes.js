const express = require("express");
var bodyParser = require("body-parser");
const {
  directLoginUser,
  registerUser,
  allUsers,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json();

//router
router.post("/send-otp", jsonParser, directLoginUser);
router.post("/verify-otp", jsonParser, registerUser);
router.get("/search", protect, allUsers);

module.exports = router;
