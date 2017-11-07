const express = require('express');
const router = express.Router();
const debug = require('debug')('students-system:reports');

const reportsController = require('../controllers/reports.controller');
const errorMiddleware = require('../middlewares/error.middleware');

router.get('/', reportsController.getReports)
    .get('/:id', reportsController.getReport)
    .post('/', reportsController.createReport)
    .delete('/:id', reportsController.removeReport)
    .use(function (err, req, res, next) {
        debug("Affairs error");
        next(err);
    })
    .use(errorMiddleware.logError);

module.exports = router;