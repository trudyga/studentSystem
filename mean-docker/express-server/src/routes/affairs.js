const express = require('express');
const router = express.Router();
const debug = require('debug')('students-system:affairs');

const affairsController = require('../controllers/affairs.contoller');
const errorMiddleware = require('../middlewares/error.middleware');

router.get('/', affairsController.getAllAffairs)
    .get('/:ticket', affairsController.getAffair)
    .post('/', affairsController.createAffair)
    .put('/:ticket', affairsController.updateAffair)
    .delete('/:ticket', affairsController.removeAffair)
    .use(function (err, req, res, next) {
        debug("Affairs error");
        next(err);
    })
    .use(errorMiddleware.logError);

module.exports = router;