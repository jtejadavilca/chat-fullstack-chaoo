const { createChat, findUserChats, findChat } = require("../controllers/chatController");

const router = require("express").Router();

router.post("/create", createChat);

router.get("/user/:id", findUserChats);

router.get("/:id", findChat);

module.exports = router;
