process.env.NODE_ENV = 'test';
const debug = require('debug')('students-system:users-test');


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();

let db = require('../../models/storage');
const User = require('../../models/entities/user');

chai.use(chaiHttp);

describe('Users', function () {
    let user = require('./examples/user.json');

    beforeEach('Free database', function () {
        return db.users.deleteAll()
            .then(() => db.affairs.deleteAll())
            .then(() => db.reports.deleteAll());
    });

    describe('POST', function () {
       it('Should create user', function () {
           return chai.request(server)
               .post('/users')
               .send(user)
               .then(res => {
                   res.should.have.status(201);
                   let u = new User(res.body);
                   u.should.be.deep.equal(user);
               });
       });

       it('Should return 404', function () {
          return chai.request(server)
              .post('/users')
              .send({login: 'login'})
              .then(res => {
                  res.should.not.exist();
              })
              .catch(err => {
                  err.should.have.status(404);
              })
       });
    });
});