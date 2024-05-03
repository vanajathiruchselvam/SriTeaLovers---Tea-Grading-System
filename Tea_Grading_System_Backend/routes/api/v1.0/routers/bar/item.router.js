const express = require('express');
const router = express.Router();
const itemController = require('../../../../../app/http/Controller/bar/item.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/bar/item.validator');

router.get('/search', validateToken(), itemController.search);

router
  .route('/')
  .get(validateToken(), itemController.getAll)
  .post(validateBodyWithToken(createRequest), itemController.create);

router
  .route('/:id')
  .get(validateToken(), itemController.show)
  .patch(validateBodyWithToken(updateRequest), itemController.edit)
  .delete(validateToken(), itemController.delete);

module.exports = router;
