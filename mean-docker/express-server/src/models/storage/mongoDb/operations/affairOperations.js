const mongoose = require('mongoose');
const affairSchema = require('../schemas/affairSchema');
const Affair = mongoose.model('Affair', affairSchema);

/**
 * Add new student affair to db
 * @param affairObj
 * @returns {Promise}
 */
module.exports.create = function (affairObj) {
    return new Promise((resolve, reject) => {
       Affair.create(affairObj, function (err, affair) {
          if(err) reject(err);
          resolve(affair);
       });
    });
};

/**
 * Update existing student affair in the db
 * @param ticket
 * @param affairObj
 * @returns {Promise}
 */
module.exports.update = function (ticket, affairObj) {
    let query = {
        ticket: ticket
    };
    let update = {
        $set: {
            name: affairObj.name,
            surname: affairObj.surname,
            fatherName: affairObj.fatherName
        }
    };

    return new Promise((resolve, reject) => {
        Affair.update(query, update, {multi: false}, function (err, affair) {
            if(err) reject(err);
            resolve(affair);
        });
    });
};

/**
 * Get existing student affair in the db
 * @param {String} ticket
 * @returns {Promise}
 */
module.exports.get = function (ticket) {
    return Affair.findOne({
        ticket: ticket
    }).exec();
};

/**
 * Get all student affairs
 * @returns {Promise}
 */
module.exports.getAll = function () {
    return Affair.find({}).exec();
};

/**
 * Remove student
 * @param {String} ticket
 * @returns {Promise}
 */
module.exports.delete = function (ticket) {
    return new Promise((resolve, reject) => {
       Affair.remove({
           ticket: ticket
       }, function (err) {
           if (err) reject(err);
           resolve({ticket});
       });
    });
};

/**
 * Remove all student affairs
 * @returns {Promise}
 */
module.exports.deleteAll = function () {
    return new Promise((resolve, reject) => {
        Affair.remove({}, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
};