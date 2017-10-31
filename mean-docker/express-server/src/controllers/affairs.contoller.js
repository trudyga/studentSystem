const affairs = require('../models/storage').affairs;
const Affair = require('../models/entities/affair');
const debug = require('debug')('student-system:users');


module.exports = function () {
    /**
     * Register new student affair in the system
     * @param req
     * @param req.body
     * @param {String} req.body.ticket      - Serial number of the student ticket
     * @param {String} req.body.name        - First name of the student
     * @param {String} req.body.surname     - Last name of the student
     * @param {String} req.body.fatherName  - Middle name of the student
     * @param res
     * @param next
     * @returns {Promise|Promise.<Affair[]>}
     */
    function createAffair(req, res, next) {
        let body = req.body;

        if (body.ticket
            && body.name
            && body.surname
            && body.fatherName) {
            let affair = {
                ticket: body.ticket,
                name: body.name,
                surname: body.surname,
                fatherName: body.fatherName
            };

            return affairs.create(affair)
                .then(affair => new Affair(affair))
                .then(affair => {
                    res.statusCode = 201;
                    res.send(affair);
                })
                .catch(err => {
                    next(err);
                });
        } else {
            res.statusCode = 400;
            res.send({message: "Not all fields specified"});
        }
    }

    /**
     * Return all affairs registered in the system
     * @param req
     * @param res
     * @param next
     * @returns {Promise|Promise.<Affair>}
     */
    function getAllAffairs(req, res, next) {
        return affairs.getAll()
            .then(affairs =>
                affairs.map(a => new Affair(a)))
            .then(affairs => {
                res.send(affairs);
            })
            .catch(err => {
                debug(err);
                next(err);
            });
    }

    /**
     * Return an affair by ticker serial number
     * @param req
     * @param req.params
     * @param {String} req.params.ticket - Serial number of the students ticket
     * @param res
     * @param next
     * @returns {Promise|Promise.<Affair | null>}
     */
    function getAffair(req, res, next) {
        let ticket = req.params.ticket;

        return affairs.get(ticket)
            .then(affair => {
                debug(affair);
                console.log(affair);
                if (affair)
                    return new Affair(affair);
                else
                    return affair;
            })
            .then(affair => {
                res.json(affair);
            })
            .catch(err => {
                next(err);
            });
    }

    /**
     * Remove an affair by serial number of the ticket
     * @param req
     * @param req.params
     * @param {String} req.params.ticket - Serial number of the students ticket
     * @param res
     * @param next
     */
    function removeAffair(req, res, next) {
        let ticket = req.params.ticket;

        return affairs.delete(ticket)
            .then(ticket => {
                res.statusCode = 200;
                res.json({ticket});
            }).catch(err => next(err));
    }

    return {
        createAffair,
        getAffair,
        getAllAffairs,
        removeAffair
    };
}();