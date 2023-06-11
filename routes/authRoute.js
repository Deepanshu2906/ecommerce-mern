const express = require("express");

const router = express.Router();
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} = require("../controllers/authController");

//routing

//REGISTER -> POST
router.post("/register", registerController);

// LOGIN -> POST
router.post("/login", loginController);

// forgot password || POST

router.post("/forgot-password", forgotPasswordController);

// test routes  two middleware
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
