const mongoose = require('mongoose');
const ReportModel = mongoose.model('Report');
const Report = require('./../models/entities/report');

const debug = require('debug')('student-system:reports');

module.exports = function () {
    /**
     * Create new report
     * @param req
     * @param res
     * @param next
     */
    function createReport(req, res, next) {
        let body = req.body;
        let report = new ReportModel(body);
        return report.save()
            .then(r => new Report(r))
            .catch(err => next(err));
    }

    /**
     * Get report by id
     * @param req
     * @param res
     * @param next
     */
    function getReport(req, res, next) {
        let id = req.params.id;
        debug(id);
        return ReportModel.findOne({id: id}).exec()
            .then(report => report ? new Report(report): null)
            .then(report => {
                res.send(report);
            })
            .catch(err => next(err));
    }

    /**
     * Get reports that match parameters
     * @param req
     * @param res
     * @param next
     */
    function getReports(req, res, next) {
        return ReportModel.where({})
            .then(reports => reports.map(report => new Report(report)))
            .then(reports => {
                res.send(reports);
            })
            .catch(err => next(err));
    }

    /**
     * Delete report by id
     * @param req
     * @param res
     * @param next
     */
    function removeReport(req, res, next) {
        console.log('Remove by id');
        console.log(req.params.id);
        return ReportModel.remove({
            _id: new mongoose.Types.ObjectId(req.params.id)
        }, function (err) {
            if (err)
                next(err);
            else
                res.json({id: req.params.id});
        });
    }

    return {
        createReport,
        getReport,
        getReports,
        removeReport
    };
}();