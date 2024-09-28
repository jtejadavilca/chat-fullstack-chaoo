const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const createMessage = async (req, res) => {
    const { chatId } = req.params;
    const { senderId, text } = req.body;
    console.log("req.params", req.params);
    console.log("req.body", req.body);

    try {
        const chat = await Chat.findById(chatId);
        console.log("chat", chat);

        if (!chat) {
            return res.status(404).json({ error: true, message: "Chat not found" });
        }

        const message = new Message({
            chatId,
            sender: senderId,
            text,
        });

        const response = await message.save();

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ error: true, message: "Chat not found" });
        }

        const messages = await Message.find({ chatId });

        res.json(messages);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

module.exports = {
    createMessage,
    getMessages,
};
