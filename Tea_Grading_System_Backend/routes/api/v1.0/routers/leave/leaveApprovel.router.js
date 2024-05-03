const express = require('express');
const router = express.Router();
const leaveController = require('../../../../../app/http/Controller/leave/leaveApprovel.controller');

const { validateToken } = require('../../../../../util/validator.util');

router.route('/').get(validateToken(), leaveController.getAll);

module.exports = router;
