const { getUser, getUsers, deleteUser } = require("../controllers/userController");

const router = require("express").Router();

router.get("/:userId", getUser);

router.get("/", getUsers);

router.delete("/", deleteUser);

module.exports = router;
