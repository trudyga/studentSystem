const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let affairSchema = new Schema({
    ticket: {
        type: String,
        required: [true, 'Ticket must be specified'],
        unique: [true, 'Ticket must be a unique value'],
        minLength: 10,
        maxLength: 10,
        match: [/^[a-zA-Zа-яА-Я]{2}[\d]{8}/, 'Invalid ticket format']
    },
    name: {
        type: String,
        match: [/^\S*$/, 'Name must be a single word'],
        required: true,
    },
    surname: {
        type: String,
        match: [/^\S*$/, 'Surname must be a single word'],
        required: true
    },
    fatherName: {
        type: String,
        match: [/^\S*$/, 'fatherName must be a single word'],
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

affairSchema.virtual('fullName').get(function () {
    return `${this.surname} ${this.name} ${this.fatherName}`;
});

module.exports = affairSchema;