const {
    createChat,
    deleteChatsByUserId,
    findUserChats,
    findChat,
    getUserPotentialChats,
    getChats,
} = require("../controllers/chatController");

const router = require("express").Router();

router.post("/:userId/chats", createChat);

router.delete("/:userId/chats", deleteChatsByUserId);

router.get("/:userId/chats", findUserChats);

router.get("/:userId/chats/potential", getUserPotentialChats);

router.get("/:userId/chats/:secondId", findChat);

router.get("/", getChats);

module.exports = router;
