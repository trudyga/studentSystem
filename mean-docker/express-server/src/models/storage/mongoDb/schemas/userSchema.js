const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        salt: {
            type: String,
            required: true
        },
        hash: {
            type: String,
            required: true
        }
    },
    name: {
        type: String,
        match: [/^\S*$/, 'Name must be a single word'],
        required: true
    },
    surname: {
        type: String,
        match: [/^\S*$/, 'Surname must be a single word'],
        required: true
    },
    fatherName: {
        type: String,
        match: [/^\S*$/, 'FatherName must be a single word'],
        required: true
    },
    phone: {
        type: String,
        match: [/^\d{12}$/, 'Phone number is Incorrect'],
        required: true,
        unique: true
    },
    department: {
        type: String,
        enum: ['D', 'TUC', 'HUD'],
        required: true
    }
});

module.exports = userSchema;
mongoose.model('User', userSchema);