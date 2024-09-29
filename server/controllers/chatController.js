const { buildUserResponse } = require("../helpers/userHelper");
const Chat = require("../models/chatModel");
const {
    handleCreateChat,
    handleDeleteChatsByUserId,
    handleFindUserChats,
    handleFindChat,
    handleGetChats,
    handleGetUserPotentialChats,
} = require("../services/chatService");

const createChat = async (req, res) => {
    const { userId: firstId } = req.params;
    const { recipientId: secondId } = req.body;

    try {
        const response = await handleCreateChat(firstId, secondId);

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

const findUserChats = async (req, res) => {
    console.time("findUserChats");
    const { userId } = req.params;

    try {
        const chats = await handleFindUserChats(userId);

        res.json(chats);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
    console.timeEnd("findUserChats");
};

const findChat = async (req, res) => {
    const { userId: firstId, secondId } = req.params;

    try {
        // const chat = await Chat.findOne({ members: { $all: [firstId, secondId] } });
        const chat = await handleFindChat(firstId, secondId);

        if (!chat) {
            return res.status(404).json({ error: true, message: "Chat not found" });
        }

        res.json(chat);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

const getChats = async (req, res) => {
    try {
        // const chats = await Chat.find();
        const chats = await handleGetChats();

        res.json(chats);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

const getUserPotentialChats = async (req, res) => {
    const { userId } = req.params;

    try {
        const potentialChats = await handleGetUserPotentialChats(userId);
        res.json(potentialChats.map(buildUserResponse));
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

const deleteChatsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const response = await handleDeleteChatsByUserId(userId);
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

module.exports = {
    createChat,
    deleteChatsByUserId,
    findUserChats,
    findChat,
    getUserPotentialChats,
    getChats,
};
