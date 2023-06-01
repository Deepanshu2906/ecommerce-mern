const express = require("express");

const router = express.Router();
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  testController,
} = require("../controllers/authController");

//routing

//REGISTER -> POST
router.post("/register", registerController);

// LOGIN -> POST
router.post("/login", loginController);
// test routes  two middleware
router.get("/test", requireSignIn, isAdmin, testController);

module.exports = router;
