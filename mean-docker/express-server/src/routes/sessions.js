const express = require('express');
const router = express.Router();
const debug = require('debug')('students-system:sessions');

const sessionsController = require('../controllers/sessions.controller');

router.post('/', sessionsController.authenticate);

module.exports = router;