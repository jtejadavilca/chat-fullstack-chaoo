const { createChat, findUserChats, findChat, getChats } = require("../controllers/chatController");

const router = require("express").Router();

router.post("/:userId/chats", createChat);

router.get("/:userId/chats", findUserChats);

router.get("/:userId/chats/:secondId", findChat);

router.get("/", getChats);

module.exports = router;
