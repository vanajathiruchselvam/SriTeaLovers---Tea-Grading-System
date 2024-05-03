const express = require('express');
const router = express.Router();
const salesController = require('../../../../../app/http/Controller/Reports/sales.controller');

const { validateToken } = require('../../../../../util/validator.util');

router.route('/').get(validateToken(), salesController.getAll);

module.exports = router;
