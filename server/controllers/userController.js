const { buildUserResponse } = require("../helpers/userHelper");
const { handleGetUser, handleGetUsers, handleDeleteUsers } = require("../services/userService");

const getUser = async (req, res) => {
    try {
        const user = await handleGetUser(req.params.userId);
        if (user == null) {
            return res.status(404).json({ error: true, message: "User not found" });
        }
        res.json(buildUserResponse(user));
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await handleGetUsers();
        res.json(users.map(buildUserResponse));
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const users = await handleDeleteUsers();
        res.json(users.map(buildUserResponse));
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
};

module.exports = { getUser, getUsers, deleteUser };
