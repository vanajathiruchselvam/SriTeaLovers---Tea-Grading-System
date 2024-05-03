const express = require('express');
const router = express.Router();
const hotelController = require('../../../../../app/http/Controller/setting/hotel.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/setting/hotels.validator');

router.get('/search', validateToken(), hotelController.search);

router
  .route('/')
  .get(validateToken(), hotelController.getAll)
  .post(validateBodyWithToken(createRequest), hotelController.create);

router
  .route('/:id')
  .get(validateToken(), hotelController.show)
  .patch(validateBodyWithToken(updateRequest), hotelController.edit)
  .delete(validateToken(), hotelController.delete);

module.exports = router;
