const express = require('express');
const router = express.Router();
const floorController = require('../../../../../app/http/Controller/masterData/floor.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/masterData/floor.validator');

router.get('/search', validateToken(), floorController.search);

router
  .route('/')
  .get(validateToken(), floorController.getAll)
  .post(validateBodyWithToken(createRequest), floorController.create);

router
  .route('/:id')
  .get(validateToken(), floorController.show)
  .patch(validateBodyWithToken(updateRequest), floorController.edit)
  .delete(validateToken(), floorController.delete);

module.exports = router;
