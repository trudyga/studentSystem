const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');
const User = mongoose.model('Users', userSchema);

/**
 * Register new user in the db
 * @param userObj
 * @returns {Promise.<Object>}
 */
module.exports.create = function (userObj = {}) {
    return new Promise((resolve, reject) => {
        User.create(userObj, function (err, user) {
           if (err) reject(err);
           resolve(user);
        });
    });
};

module.exports.getAll = function () {
    return User.find({})
        .exec();
};

/**
 * Get user information
 * @param login
 * @returns {Promise.<Object>}
 */
module.exports.get = function (login) {
    return User.findOne({
        login: login
    }).exec()
        .then(user => user);
};

/**
 * Authenticate user
 * @param login
 * @param password
 * @returns {Promise.<Object>}
 */
module.exports.authenticate = function (login, password) {
    return User.findOne({
        login: login
    })
        .exec()
        .then(user => {
            console.log(`${user && user.password} === ${password}`);
            if (!user)
                return {
                    check: false,
                    login: login,
                    message: "Login is not correct"
                };

            if (user.password === password) {
                return {
                    check: true,
                    login: login
                };
            } else {
                return {
                    check: false,
                    login: login,
                    message: "Password is not correct"
                };
            }
        });
};

/**
 * Delete all users from the system
 * @returns {Promise}
 */
module.exports.deleteAll = function () {
    return new Promise((resolve, reject) => {
        User.remove({}, function (err) {
            if (err)
                reject(err);
            resolve();
        });
    });
};