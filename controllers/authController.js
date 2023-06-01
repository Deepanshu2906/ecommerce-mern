const userModel = require("../models/user-model");
const { hashPassword } = require("../helpers/auth-helper");

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

module.exports = {
  registerController,
};
