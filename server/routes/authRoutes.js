const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/userModel');
const { generateToken } = require('../auth/jwt_util');
const { validateRegisterFields } = require('../auth/validate_util');




// Create account (register)
router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    const msgValidation = validateRegisterFields(name, email, password);
    if (msgValidation) {
        return res.status(400).json({ message: msgValidation });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = new User({name, email, password: encryptedPassword});

    try {
        const newUser = await user.save();
        res.status(201).json({
            token: generateToken(newUser)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const wrongCredentials = { message: 'Wrong credentials!', error: true};
    if (user == null) {
        return res.status(400).json(wrongCredentials);
    }

    if(!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).json(wrongCredentials);
    }

    res.json({
        token: generateToken(user)
    });
});

router.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user == null) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});



router.delete('/users', async (req, res) => {
    const users = await User.deleteMany();
    res.json(users);
});

module.exports = router;