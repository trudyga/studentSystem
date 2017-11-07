process.env.NODE_ENV = 'test';
const debug = require('debug')('students-system:sessions-test');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = chai.should();

const jwt = require('jwt-simple');
const authConfig = require('../../services/auth/auth-config.json');

let db = require('../../models/storage');
const User = require('../../models/entities/user');
const encryptService = require('../../services/auth/pass.encrypt.service');

chai.use(chaiHttp);

describe('/session/', function () {
    let user = require('./examples/user.json');
    let hashedPassword = encryptService.hashPassword(user.password);
    let initialPassword = user.password;

    beforeEach('Remove all users', function () {
        user.password = hashedPassword;
        return db.users.deleteAll();
    });

    afterEach('Restore user object', function() {
        user.password = initialPassword;
    });

    describe('POST', function () {
        beforeEach('Register user', function () {
            return db.users.create(user);
        });

        afterEach('Remove users', function () {
            return db.users.deleteAll();
        });

        it('Must fail authentication if login/password is not correct', function () {
            return chai.request(server)
                .post('/session')
                .send({
                    login: 'incorrectLogin',
                    password: 'incorrectPassword'
                })
                .then(res => {
                    res.should.not.exist();
                })
                .catch(err => {
                    return err.should.have.status(403);
                });

        });

        it('Must return correct token', function () {
           return chai.request(server)
               .post('/session')
               .send({
                   login: user.login,
                   password: initialPassword
               })
               .then(res => {
                   let token = res.body.token;
                   debug(token);
                   let payload = jwt.decode(token, authConfig.jwtSecret);
                   payload.should.be.deep.equal({
                       login: user.login,
                       password: user.password.hash
                   });
               });
        });
    });
});