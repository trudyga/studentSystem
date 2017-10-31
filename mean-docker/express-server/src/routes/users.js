const express = require('express');
const router = express.Router();
const debug = require('debug')('student-system:users');

const usersController = require('../controllers/users.controller');

router.get('/', function (req, res, next) {
    return usersController.getUsers(req, res, next);
});

router.post('/', function (req, res, next) {
    return usersController.createUser(req, res, next);
});

router.get('/:username', function (req, res, next) {
    return usersController.get(req, res, next);
});

router.use(function (err, req, res, next) {
    debug("Users route error");
    debug(err);

    res.statusCode = 500;
    res.send(err);
});

module.exports = router;