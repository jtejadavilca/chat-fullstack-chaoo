const validator = require('validator');

const validateRegisterFields = (name, email, password) => {
    if (!name || !email || !password) {
        return 'Please enter all fields';
    }

    if (!validator.isEmail(email)) {
        return 'Invalid email';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }
    
    if(!validator.isStrongPassword(password)) {
        return 'Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character';
    }

    return null;
}

const validateLoginFields = (email, password) => {
    if (!email || !password) {
        return 'Please enter all fields';
    }

    if (!validator.isEmail(email)) {
        return 'Invalid email';
    }

    return null;
}

module.exports = { validateRegisterFields, validateLoginFields };