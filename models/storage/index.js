const db = {};

db.affairs = require('./mongoDb/operations/affairOperations');
db.reports = require('./mongoDb/operations/reportOperations');
db.users = require('./mongoDb/operations/userOperations');

module.exports = db;