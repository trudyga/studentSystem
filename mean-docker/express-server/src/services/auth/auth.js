const passport = require('passport');
const JwtStrategy = require('passport-jwt'),
    ExtractJwt = require('passport-jwt').ExtractJwt;
const users = require('../../models/storage').users;

const config = require('./auth-config.json');

passport.use(new JwtStrategy({
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, function (jwt_payload, done) {
    let login = jwt_payload.login;
    let password = jwt_payload.password;

    users.authenticate(login, password)
        .then(check => {
            if (check.check)
                done(null, {login: check.login});
            else
                done(null, false, {
                    login: check.login,
                    message: check.message
                });
        }).catch(err => done(err));
}));

module.exports = {
    initialize: function () {
        return passport.initialize();
    },
    authenticate: function () {
        return passport.authenticate("jwt", config.jwtSession);
    }
};