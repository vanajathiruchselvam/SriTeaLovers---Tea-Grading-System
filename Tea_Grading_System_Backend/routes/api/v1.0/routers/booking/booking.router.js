const express = require('express');
const router = express.Router();
const bookingController = require('../../../../../app/http/Controller/booking/booking.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  paymentRequest,
  createRequest,
} = require('../../../../../app/http/validator/booking/booking.validator');

router
  .route('/')
  .get(validateToken(), bookingController.getAll)
  .post(validateBodyWithToken(createRequest), bookingController.create);

router.route('/:id').get(validateToken(), bookingController.show);
router.route('/:id/cancel').patch(validateToken(), bookingController.cancel);
router
  .route('/:id/payment')
  .patch(validateBodyWithToken(paymentRequest), bookingController.payment);

module.exports = router;
