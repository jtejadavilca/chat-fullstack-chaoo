const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 200,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);