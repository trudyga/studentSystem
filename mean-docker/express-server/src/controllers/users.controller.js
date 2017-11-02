const users = require('../models/storage').users;
const mongoose = require('mongoose');
const UsersModel = mongoose.model('Users');
const User = require('../models/entities/user');
const debug = require('debug')('student-system:users');

const encryptService = require('../services/auth/pass.encrypt.service');


module.exports = function() {
    /**
     * Get all users registered in the system
     * @param req
     * @param res
     * @param next
     * @returns {Promise|Promise.<User[] | []>}
     */
    function getUsers(req, res, next) {
        return UsersModel.find({})
            .then(users => {
                debug(users);
                return users;
            })
            .then(users => users.map(u => new User(u)))
            .then(users => res.send(users))
            .catch(err => next(err));
    }

    /**
     * Get one user by username
     * @param req
     * @param req.params.user - Username
     * @param res
     * @param next
     * @returns {Promise|Promise.<User | null>}
     */
    function get(req, res, next) {
        let username = req.params.username;

        return UsersModel.findOne({login: username})
            .then(user => user ? new User(user) : null)
            .then(u => res.send(u))
            .catch(err => next(err));
    }

    /**
     * Register new user in the system
     * @param {Object} req
     * @param {Object} req.body
     * @param {String} req.body.login       - username of the new user(must be unique)
     * @param {String} req.body.password    - password of the user, being created
     * @param {String} req.body.name        - first name of the person to which the account being created belongs
     * @param {String} req.body.surname     - last name of the person to which the account being created belongs
     * @param {String} req.body.fatherName  - middle name of the person to which the account being created belongs
     * @param {String} req.body.phone       - the phone of the person
     * @param {'D'|'TUC'|'HUD'} req.body.department
     *                                      - name of the department, where new user works
     * @param res
     * @param next
     * @returns {Promise|Promise.<User>}
     */
    function createUser(req, res, next) {
        if (!req || !req.body)
            res.sendStatus(400);

        let user = req.body;
        if (user.login
            && user.password
            && user.name
            && user.surname
            && user.fatherName
            && user.phone
            && user.department) {

            user.password = encryptService.hashPassword(user.password);

            debug(user);

            let u = new UsersModel(user);

            return u.save()
                .then(u => new User(u))
                .then(u => {
                    res.statusCode = 201;
                    res.send(u);
                })
                .catch(err => next(err));
        } else {
            res.statusCode = 400;
            res.send({
                message: "Can't register user. Not all fields specified"
            });
        }
    }

    return {
        getUsers,
        get,
        createUser
    };
}();