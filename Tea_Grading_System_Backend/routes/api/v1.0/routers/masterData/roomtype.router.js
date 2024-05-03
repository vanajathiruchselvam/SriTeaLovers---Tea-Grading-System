const express = require('express');
const router = express.Router();
const roomtypeController = require('../../../../../app/http/Controller/masterData/roomtype.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/masterData/roomtype.validator');

router.get('/search', validateToken(), roomtypeController.search);

router
  .route('/')
  .get(validateToken(), roomtypeController.getAll)
  .post(validateBodyWithToken(createRequest), roomtypeController.create);

router
  .route('/:id')
  .get(validateToken(), roomtypeController.show)
  .patch(validateBodyWithToken(updateRequest), roomtypeController.edit)
  .delete(validateToken(), roomtypeController.delete);

module.exports = router;
