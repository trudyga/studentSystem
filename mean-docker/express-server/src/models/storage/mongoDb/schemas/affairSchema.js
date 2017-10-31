const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let affairSchema = new Schema({
    ticket: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    }
});

module.exports = affairSchema;