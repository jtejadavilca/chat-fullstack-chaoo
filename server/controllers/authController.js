const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateToken } = require("../auth/jwt_util");
const { validateRegisterFields } = require("../auth/validate_util");

const getUserResponse = (user) => {
    return {
        token: generateToken(user),
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const msgValidation = validateRegisterFields(name, email, password);
    if (msgValidation) {
        return res.status(400).json({ message: msgValidation, error: true });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = new User({ name, email, password: encryptedPassword });

    try {
        const newUser = await user.save();
        res.status(201).json(getUserResponse(newUser));
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const wrongCredentials = { message: "Wrong credentials!", error: true };
    if (user == null) {
        return res.status(400).json(wrongCredentials);
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).json(wrongCredentials);
    }

    res.json(getUserResponse(user));
};

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user == null) {
        return res.status(404).json({ error: true, message: "User not found" });
    }
    res.json(user);
};

const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const deleteUser = async (req, res) => {
    const users = await User.deleteMany();
    res.json(users);
};

module.exports = { registerUser, login, getUser, getUsers, deleteUser };
