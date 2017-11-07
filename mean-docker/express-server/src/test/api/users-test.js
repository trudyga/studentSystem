process.env.NODE_ENV = 'test';
const debug = require('debug')('students-system:users-test');


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = chai.should();

let db = require('../../models/storage');
const User = require('../../models/entities/user');
const encryptService = require('../../services/auth/pass.encrypt.service');

chai.use(chaiHttp);

describe('Users', function () {
    let user = require('./examples/user.json');
    let hashedPassword = encryptService.hashPassword(user.password);
    let initialPassword = user.password;

    beforeEach('Free database', function () {
        return db.users.deleteAll()
            .then(() => db.affairs.deleteAll())
            .then(() => db.reports.deleteAll());
    });

    afterEach('Restore user object' ,function () {
        user.password = initialPassword;
    });

    describe('POST', function () {
       it('Should create user', function () {
           return chai.request(server)
               .post('/users')
               .send(user)
               .then(res => {
                   res.should.have.status(201);
                   let u = new User(res.body);
                   user.password = hashedPassword;
                   debug(user);
                   debug(u);
                   u.should.be.deep.equal(u);
               });
       });

       it('Should return 400', function () {
          return chai.request(server)
              .post('/users')
              .send({login: 'login'})
              .then(res => {
                  res.should.not.exist();
              })
              .catch(err => {
                  err.should.have.status(400);
              })
       });
    });
});