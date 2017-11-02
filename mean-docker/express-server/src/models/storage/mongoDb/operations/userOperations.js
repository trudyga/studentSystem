const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');
const User = mongoose.model('Users', userSchema);

const encryptService = require('../../../../services/auth/pass.encrypt.service');

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

/**
 * Get All users from the system
 * @returns {Promise|Array|{index: number, input: string}} - users list
 */
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
            if (!user)
                return {
                    check: false,
                    login: login,
                    message: "Login is not correct"
                };

            let hash = encryptService.hashPassword(password,
                user.password.salt).hash;

            console.log(`${user && user.password.hash} === ${hash}`);

            if (user.password.hash === hash) {
                return {
                    check: true,
                    hash,
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