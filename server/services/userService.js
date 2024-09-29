const User = require("../models/userModel");

const handleGetUser = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        throw new Error("Error getting user");
    }
};

const handleGetUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error("Error getting users");
    }
};

const handleDeleteUsers = async () => {
    try {
        return await User.deleteMany();
    } catch (error) {
        throw new Error("Error deleting users");
    }
};

module.exports = { handleGetUser, handleGetUsers, handleDeleteUsers };
