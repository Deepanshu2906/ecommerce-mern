const userModel = require("../models/user-model");
const { hashPassword, comparePassword } = require("../helpers/auth-helper");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // validation
    if (!name) {
      return res.send("Name is required");
    }
    if (!email) {
      return res.send("email is required");
    }
    if (!password) {
      console.log("Password is required");
    }
    if (!phone) {
      console.log("phone number is required");
    }
    if (!address) {
      console.log(" address is required");
    }

    // checking if existing user
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered please login",
      });
    }
    // regiser user

    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      err: error,
      message: "Error in registration !",
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validator
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid  email or password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      err: error,
    });
  }
};
// test controller
const testController = async (req, res) => {
  res.send("Protected routed");
};

module.exports = {
  registerController,
  loginController,
  testController,
};
