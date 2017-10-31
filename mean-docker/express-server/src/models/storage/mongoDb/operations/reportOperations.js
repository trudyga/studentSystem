const mongoose = require('mongoose');
const reportSchema = require('../schemas/reportSchema');
const Report = mongoose.model('Report', reportSchema);


/**
 * Register new report in the db
 * @param reportObj
 * @returns {Promise}
 */
module.exports.create = function (reportObj) {
    return new Promise((resolve, reject) => {
        Report.create(reportObj, function (err, user) {
            if (err) reject(err);
            resolve(user);
        });
    });
};

/**
 * Get existing report by id
 * @param id
 * @returns {Promise.<TResult>}
 */
module.exports.get = function (id) {
    return Report.find({
        _id: id
    }).exec()
        .then(user => user);
};

/**
 * Remove all reports from the db
 * @returns {Promise}
 */
module.exports.deleteAll = function () {
    return new Promise((resolve, reject) => {
        Report.remove({}, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
};