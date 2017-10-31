const jwt = require('jwt-simple');
const jwtConfig =
    require('../services/auth/auth-config.json');
const users = require('../models/storage').users;
const debug = require('debug')('student-system:users');


module.exports = function () {
    function authenticate(req, res, next) {
        let login = req.body.login;
        let password = req.body.password;

        return users.authenticate(login, password)
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
    }

    return {
        authenticate
    }
}();