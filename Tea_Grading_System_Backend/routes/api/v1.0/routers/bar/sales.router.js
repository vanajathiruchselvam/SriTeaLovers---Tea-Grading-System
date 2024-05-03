const express = require('express');
const router = express.Router();
const salesController = require('../../../../../app/http/Controller/bar/sales.controler');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  paymentRequest,
} = require('../../../../../app/http/validator/bar/sales.validator');

router
  .route('/')
  .get(validateToken(), salesController.getAll)
  .post(validateBodyWithToken(createRequest), salesController.create);

router.route('/:id').get(validateToken(), salesController.show);
router.route('/:id/cancel').patch(validateToken(), salesController.cancel);
router
  .route('/:id/payment')
  .patch(validateBodyWithToken(paymentRequest), salesController.payment);

module.exports = router;
