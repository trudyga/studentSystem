const debug = require('debug')('student-system:errors');

module.exports = function () {
    function logError(err, req, res, next) {
        debug(err);
        res.statusCode = 500;
        res.sendStatus(err);
    }

    return {
        logError
    };
}();
