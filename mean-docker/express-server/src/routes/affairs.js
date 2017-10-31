const express = require('express');
const router = express.Router();
const debug = require('debug')('students-system:affairs');

const affairsController = require('../controllers/affairs.contoller');

router.get('/', affairsController.getAllAffairs)
    .get('/:ticket', affairsController.getAffair)
    .post('/', affairsController.createAffair)
    .delete('/:ticket', affairsController.removeAffair)
    .use(function (err, req, res, next) {
        debug("Affairs error");
        debug(err);
        console.log(err);
        console.log(err);
        res.statusCode = 500;
        res.json(err);
    });

module.exports = router;