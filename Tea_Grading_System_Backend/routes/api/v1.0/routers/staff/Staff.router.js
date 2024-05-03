const express = require('express');
const router = express.Router();
const staffController = require('../../../../../app/http/Controller/staff/staff.service');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/staff/staff.validator');

router.get('/search', validateToken(), staffController.search);

router
  .route('/')
  .get(validateToken(), staffController.getAll)
  .post(validateBodyWithToken(createRequest), staffController.create);

router
  .route('/:id')
  .get(validateToken(), staffController.show)
  .patch(validateBodyWithToken(updateRequest), staffController.edit)
  .delete(validateToken(), staffController.delete);

module.exports = router;
