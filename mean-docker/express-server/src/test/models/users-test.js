const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
chai.use(chaiAsProm);
const should = chai.should();
const debug = require('debug')('students-system:users-module-test');

const db = require('../../models/storage');
const User = require('../../models/entities/user');
const encryptService = require('../../services/auth/pass.encrypt.service');

describe('User model', function () {
    let user = require('./examples/user.json');
    let hashedPassword = encryptService.hashPassword(user.password);
    let initialPassword = user.password;

    beforeEach('Remove all users', function () {
        return db.users
            .deleteAll();
    });

    describe('Create new user', function () {
        beforeEach('Remove all', function () {
            user.password = hashedPassword;
            return db.users.deleteAll();
        });

        afterEach('Restore password', function () {
            user.password = initialPassword;
        });

        it('Should fail if not all fields specified', function () {
            return db.users
                .create({})
                .should.be.rejected;
        });

        it('Should create user', function () {
            return db.users
                .create(user)
                .then(u => {
                    debug(u);
                    u = new User(u);
                    user.password = hashedPassword;
                    u.should.be.deep.equal(u);
                });
        });
    });

    describe('Should return user', function() {
        beforeEach('Should create user', function () {
            user.password = hashedPassword;
            return db.users
                .create(user);
        });

        afterEach('Should update user', function () {
            user.password = initialPassword;
            return db.users.deleteAll();
        });

        it('Should return user', function () {
            return db.users.get(user.login)
                .then(u => {
                    u.should.have.property('login', user.login);
                });
        });

        it('Should return null if login is incorrect', function () {
            return db.users.get('incorrect')
                .then(u => {
                    should.equal(u, null);
                });
        });
    });

    describe('Should authenticate user', function () {
        beforeEach('Should create user', function () {
            user.password = hashedPassword;
            return db.users
                .create(user);
        });

        afterEach('Should update user', function () {
            user.password = initialPassword;
            return db.users.deleteAll();
        });

        it('Should fail autentication if password is incorrect' ,function () {
            return db.users
                .authenticate(user.login, 'incorrect')
                .then(check => {
                    check.check.should.be.false;
                    check.message.should.be.equal("Password is not correct");
                });
        });

        it('Should fail authentication if login is incorrect' ,function () {
            return db.users
                .authenticate('incrorect', initialPassword)
                .then(check => {
                    check.check.should.be.false;
                    check.message.should.be.equal("Login is not correct");
                });
        });

        it('Should authenticate if login and password match', function () {
            return db.users
                .authenticate(user.login, initialPassword)
                .then(check => {
                    check.should.have.property('check', true);
                    check.should.not.have.property('message');
                });
        });
    });
});