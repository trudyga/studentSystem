process.env.NODE_ENV = 'test';
const debug = require('debug')('students-system:affairs-test');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();

const jwt = require('jwt-simple');
const authConfig = require('../../services/auth/auth-config.json');

let db = require('../../models/storage');
const Affair = require('../../models/entities/affair');

chai.use(chaiHttp);

describe('/affairs', function () {
    let affair = require('./examples/affair.json');

    beforeEach('Remove all affairs', function () {
        db.affairs.deleteAll();
    });

    describe('POST',function () {
       it('Must return 404 if req.body is not correct', function () {
           return chai.request(server)
               .post('/affairs')
               .send({})
               .then(res => res.should.not.exist())
               .catch(err =>
                   err.should.have.status(404));
       });

       it('Must create new affair', function () {
           return chai.request(server)
               .post('/affairs')
               .send(affair)
               .then(res => {
                   res.body.should.be.deep.equal(affair);
               });
       });
    });

    describe('GET', function () {
        beforeEach("Create affair", function () {
            db.affairs
                .create(affair);
        });

        afterEach("Create affair", function () {
            return db.affairs.deleteAll();
        });

        it('Must retun 1 affair', function () {
            return chai.request(server)
                .get('/affairs')
                .then(res => {
                    res.body.should.be.instanceOf(Array);
                    res.body.should.have.lengthOf(1);
                });
        });
    });
});

