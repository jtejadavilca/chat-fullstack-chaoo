const { createMessage, getMessages } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/:chatId/messages", createMessage);

router.get("/:chatId/messages", getMessages);

module.exports = router;
