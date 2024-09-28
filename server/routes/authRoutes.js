const { registerUser, login, getUser, getUsers, deleteUser } = require("../controllers/authController");

const router = require("express").Router();

// Create account (register)
router.post("/register", registerUser);

// Login
router.post("/login", login);

router.get("/users/:id", getUser);

router.get("/users", getUsers);

router.delete("/users", deleteUser);

module.exports = router;
