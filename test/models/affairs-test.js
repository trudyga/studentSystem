const chai = require('chai');
const chaiAsProm = require('chai-as-promised');
chai.use(chaiAsProm);
const should = chai.should();
const debug = require('debug')('students-system:users-module-test');

const db = require('../../models/storage');
const Affair = require('../../models/entities/affair');


describe('Affair model', function() {
    let affair = require('./examples/affair.json');

    beforeEach('Remove all affairs', function () {
        return db.affairs.deleteAll();
    });

    describe('Create affair test', function() {
        it('Must create new affair', function () {
            return db.affairs
                .create(affair)
                .then(affair => new Affair(affair))
                .then(affair => {
                    affair.should.be.deep.equal(affair);
                });
        });

        it('Must fail affair creation', function () {
            return db.affairs
                .create({})
                .then(affair => {
                    should.not.exist(affair);
                }).should.be.rejected;
        });
    });

    describe('Remove affair', function () {
        beforeEach('Create affair', function () {
            return db.affairs.create(affair);
        });

        afterEach('Remove all affairs', function () {
            return db.affairs.deleteAll();
        });

        it('Should remove affair', function () {
            return db.affairs
                .delete(affair.ticket)
                .should.be.eventually.deep.equal({ticket: affair.ticket});
        });
    });

    describe('Update affair', function () {
        beforeEach('Create affair', function () {
            return db.affairs.create(affair);
        });

        afterEach('Remove all affairs', function () {
            return db.affairs.deleteAll();
        });

        it('Should update affair', function () {
            let newAffair = affair;
            newAffair.name = 'newAffair';

            return db.affairs
                .update(affair.ticket, newAffair)
                .should.eventually.have.property('nModified', 1);
        });

        it('Should fail updation if not all fileds specified', function () {
            return db.affairs
                .update(affair.ticket, {})
                .should.eventually.have.property('nModified', 0);
        });

        it('Should fail updation if ticket is not specified', function () {
            return db.affairs
                .update('incorrect', affair)
                .should.eventually.have.property('nModified', 0);
        });
    });

    describe("Retrieve affair", function () {
        beforeEach('Create affair', function () {
            return db.affairs.create(affair);
        });

        afterEach('Remove all affairs', function () {
            return db.affairs.deleteAll();
        });

        it('Should return affair', function () {
            return db.affairs.get(affair.ticket)
                .then(affair => new Affair(affair))
                .should.eventually.be.instanceOf(Affair);
        });

        it('Should fail retrievement', function () {
            return db.affairs.get('incorrect')
                .then(affair => {
                    should.equal(affair, null);
                });
        });
    });

    describe('Retrieve all affairs', function () {
        beforeEach('Create affair', function () {
            return db.affairs.create(affair);
        });

        afterEach('Remove all affairs', function () {
            return db.affairs.deleteAll();
        });

        it('Should return 0 affairs', function () {
           return db.affairs.deleteAll()
               .then(() => db.affairs.getAll())
               .then(affairs => {
                   affairs.should.be.instanceOf(Array);
                   affairs.should.have.lengthOf(0);
               });
        });

        it('Should return 1 affair', function () {
           return db.affairs.getAll()
               .then(affairs => {
                   affairs.should.be.instanceOf(Array);
                   affairs.should.have.lengthOf(1);
               });
        });
    });
});