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
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
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