const asyncHandler = require("express-async-handler");
const fast2sms = require("fast-two-sms");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const dotenv = require("dotenv");
const logger = require("../logger");

dotenv.config();

const sms_auth_key = process.env.SMS_AUTH_KEY;

const directLoginUser = asyncHandler(async (req, res) => {
  const { name, mobileNumber } = req.body;

  if (!name || !mobileNumber) {
    res.status(400);
    throw new Error("Please Enter All fields!");
  }

  const userExists = await User.findOne({ mobileNumber });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  try {
    //const number = req.body.number;
    console.log(mobileNumber);
    console.log(sms_auth_key);
    const otp = Math.floor(10000 + Math.random() * 900000);
    console.log(otp);
    if (mobileNumber && sms_auth_key) {
      var options = {
        authorization: sms_auth_key,
        message: "Your OTP is: " + otp,
        numbers: [mobileNumber],
      };
      console.log("Sending otp to your mobile number");
      fast2sms
        .sendMessage(options)
        .then((response) => {
          console.log(response);
          res.cookie("mobileOtp", otp, {
            //expires: new Date(Date.now() + 10),
            maxAge: "25920000",
            httpOnly: true,
          });
          //req.cookies["mobileOtp"];
          console.log(req.cookies["mobileOtp"]);
          res.send(response);
        })
        .catch((error) => {
          console.log("Error while sending OTP", error);
          res
            .status(500)
            .json({ success: false, message: "Failed to send OTP" });
        });
    }
  } catch (error) {
    console.log("Error while sending OTP", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  console.log("verify OTP handler is called");
  const { name, mobileNumber, otp } = req.body;

  if (!name || !mobileNumber || !otp) {
    res.status(400);
    throw new Error("Please Enter All fields!");
  }

  const userExists = await User.findOne({ mobileNumber });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  try {
    let actualOtp = req.cookies["mobileOtp"];
    console.log("actualOtp: " + req.cookies["mobileOtp"]);
    console.log("userEnteredOtp: " + otp);
    const userEnteredOtp = otp;
    //actualOtp = "136982";
    logger.info("Actual cookie OTP: " + actualOtp);
    logger.info("User Entered OTP: " + otp);
    if (actualOtp == userEnteredOtp) {
      const user = await User.create({
        name,
        mobileNumber,
        otp,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          token: generateToken(user._id),
          success: true,
          message: "OTP is validated succesfully and user is created",
        });
      } else {
        res.status(400);
        throw new Error("Failed to create the user and OTP validation success");
      }
    } else {
      res.status(400).json({ success: false, message: "OTP is invalid" });
      throw new Error("OTP is invalid");
    }
  } catch (err) {
    console.log("Error while verifying OTP", err);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});

// api/user?search=yasin
const allUsers = asyncHandler(async (req, res) => {
  console.log(req.query.name);
  const keyword = req.query.name
    ? {
        $or: [{ name: { $regex: req.query.name, $options: "i" } }],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { directLoginUser, registerUser, allUsers };
