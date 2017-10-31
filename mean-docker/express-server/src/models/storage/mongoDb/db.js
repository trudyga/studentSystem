const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentsSystem', {
    useMongoClient: true
});

const debug = require('debug')('students-system:mongo-db');

const userSchema = require('./schemas/userSchema');
const affairSchema = require('./schemas/affairSchema');
const reportSchema = require('./schemas/reportSchema');
