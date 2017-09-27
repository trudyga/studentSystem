const express = require('express');
const router = express.Router();

const jwt = require('jwt-simple');
const jwtConfig =
    require('../services/auth/auth-config.json');
const users = require('../models/storage').users;

const debug = require('debug')('students-system:sessions');

router.post('/', function (req, res, next) {
    let login = req.body.login;
    let password = req.body.password;

    users.authenticate(login, password)
        .then(check => {
            console.log("Check");
            console.log(check);
            if (!check.check) {
                res.statusCode = 403;
                res.send(check);
                return;
            }

            let payload = {
                login,
                password
            };
            let token = jwt.encode(payload, jwtConfig.jwtSecret);
            debug("Token: " + token);

            res.json({
                token: token
            });
        }).catch(err => {
            res.statusCode = 500;
            res.send(err);
    });
});

module.exports = router;