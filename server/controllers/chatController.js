const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        const chat = await Chat.findOne({ members: { $all: [firstId, secondId] } });

        if (chat) {
            return res.status(200).json(chat);
        }

        const newChat = new Chat({
            members: [firstId, secondId],
            messages: [],
        });

        const response = await newChat.save();

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

const findUserChats = async (req, res) => {
    const { userId } = req.params;

    try {
        const chats = await Chat.find({ members: { $in: [userId] } });

        res.json(chats);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await Chat.findOne({ members: { $all: [firstId, secondId] } });

        if (!chat) {
            return res.status(404).json({ error: true, message: "Chat not found" });
        }

        res.json(chat);
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

module.exports = {
    createChat,
    findUserChats,
    findChat,
};
