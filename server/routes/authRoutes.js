const { registerUser, login } = require("../controllers/authController");

const router = require("express").Router();

// Create account (register)
router.post("/register", registerUser);

// Login
router.post("/login", login);

module.exports = router;
