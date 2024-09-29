const buildUserResponse = (user) => {
    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

module.exports = { buildUserResponse };
