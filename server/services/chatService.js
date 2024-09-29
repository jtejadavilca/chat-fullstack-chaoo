const Chat = require("../models/chatModel");
const { handleGetUsers } = require("./userService");

const handleCreateChat = async (userId, recipientId) => {
    try {
        console.log("userId:", userId, "recipientId", recipientId);
        const chat = await Chat.findOne({ members: { $all: [userId, recipientId] } });

        if (chat) {
            return chat;
        }

        const newChat = new Chat({
            members: [userId, recipientId],
            messages: [],
        });

        return await newChat.save();
    } catch (error) {
        console.error("Error finding chat in BD", error);
        throw new Error("Error finding chat in BD");
    }
};

const handleDeleteChatsByUserId = async (userId) => {
    try {
        return await Chat.deleteMany({ members: { $in: [userId] } });
    } catch (error) {
        const errorMessage = "Error deleting user chats in BD";
        console.error(errorMessage, error);
        throw new Error(errorMessage);
    }
};

const handleFindUserChats = async (userId) => {
    try {
        return await Chat.find({ members: { $in: [userId] } });
    } catch (error) {
        const errorMessage = "Error finding user chats in BD";
        console.error(errorMessage, error);
        throw new Error(errorMessage);
    }
};

const handleFindChat = async (userId, contactId) => {
    try {
        return await Chat.findOne({ members: { $all: [userId, contactId] } });
    } catch (error) {
        const errorMessage = "Error finding chat in BD";
        console.error(errorMessage, error);
        throw new Error(errorMessage);
    }
};

const handleGetChats = async () => {
    try {
        return await Chat.find();
    } catch (error) {
        const errorMessage = "Error getting chats from BD";
        console.error(errorMessage, error);
        throw new Error(errorMessage);
    }
};

const handleGetUserPotentialChats = async (userId) => {
    try {
        const users = await handleGetUsers();
        const userChats = await handleFindUserChats(userId);

        const potentialChats = users.filter((user) => {
            let isChatCreated = false;

            if (user._id.equals(userId)) {
                return false;
            }

            if (userChats) {
                isChatCreated = userChats.some((chat) => chat.members.includes(user._id));
            }
            return !isChatCreated;
        });

        return potentialChats;
    } catch (error) {
        const errorMessage = "Error getting user potential chats";
        console.error(errorMessage, error);
        throw new Error(errorMessage);
    }
};

module.exports = {
    handleCreateChat,
    handleDeleteChatsByUserId,
    handleFindUserChats,
    handleFindChat,
    handleGetChats,
    handleGetUserPotentialChats,
};
