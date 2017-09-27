const express = require('express');
const router = express.Router();
const debug = require('debug')('student-system:users');

const users = require('../models/storage').users;
const User = require('../models/entities/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    users.getAll()
        .then(users => users.map(u => new User(u)))
        .then(users => {
            res.send(users);
        })
        .catch(err => next(err));
});

router.post('/', function(req, res, next) {
    if (!req || !req.body)
        res.sendStatus(404);
    let user = req.body;
    if (user.login
        && user.password
        && user.name
        && user.surname
        && user.fatherName
        && user.phone
        && user.department) {
        users.create(user)
            .then(u => new User(u))
            .then(u => {
                res.statusCode = 201;
                res.send(u);
            })
            .catch(err => next(err));
    } else {
        res.statusCode = 404;
        res.send({
            message: "Can't register user. Not all fields specified"
        });
    }
});

router.use(function (err, req, res, next) {
    debug("Users route error");
    debug(err);

    res.statusCode = 500;
    res.send(err);
});

module.exports = router;