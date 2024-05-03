const express = require('express');
const router = express.Router();
const customerController = require('../../../../../app/http/Controller/customer/customer.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/customer/customer.validator');

router.get('/search', validateToken(), customerController.search);

router
  .route('/')
  .get(validateToken(), customerController.getAll)
  .post(validateBodyWithToken(createRequest), customerController.create);

router
  .route('/:id')
  .get(validateToken(), customerController.show)
  .patch(validateBodyWithToken(updateRequest), customerController.edit)
  .delete(validateToken(), customerController.delete);

module.exports = router;
