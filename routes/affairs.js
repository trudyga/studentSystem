const express = require('express');
const router = express.Router();
const debug = require('debug')('students-system:affairs');

const affairs = require('../models/storage').affairs;
const Affair = require('../models/entities/affair');

/**
 * Register new affair
 */
router.post('/', function (req, res, next) {
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

       affairs.create(affair)
           .then(affair => new Affair(affair))
           .then(affair => {
               res.statusCode = 201;
               res.send(affair);
           })
           .catch(err => {
               next(err);
           });
   } else {
       res.statusCode = 404;
       res.send({message: "Not all fields specified"});
   }
});


/**
 * Get all affairs
 */
router.get('/', function (req, res, next) {
    affairs.getAll()
        .then(affairs =>
            affairs.map(a => new Affair(a)))
        .then(affairs => {
            res.send(affairs);
        })
        .catch(err => {
            debug(err);
            next(err);
        });
});

/**
 * Get affair by ticket name
 */
router.get('/:ticket', function (req, res, next) {
    let ticket = req.params.ticket;

    affairs.get(ticket)
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
});

/**
 * Remove affair by ticket name
 */
router.delete('/:ticket', function (req, res, next) {
    let ticket = req.params.ticket;

    affairs.delete(ticket)
        .then(ticket => {
            res.statusCode = 200;
            res.json({ticket});
        }).catch(err => next(err));
});

router.use(function (err, req, res, next) {
    debug("Affairs error");
    debug(err);
    console.log(err);
    console.log(err);
    res.statusCode = 500;
    res.json(err);
});


module.exports = router;