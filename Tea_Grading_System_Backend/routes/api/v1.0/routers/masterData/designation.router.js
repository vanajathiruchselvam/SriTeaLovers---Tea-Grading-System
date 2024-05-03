const express = require('express');
const router = express.Router();
const designationController = require('../../../../../app/http/Controller/masterData/designation.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/masterData/designation.validator');

router.get('/search', validateToken(), designationController.search);

router
  .route('/')
  .get(validateToken(), designationController.getAll)
  .post(validateBodyWithToken(createRequest), designationController.create);

router
  .route('/:id')
  .get(validateToken(), designationController.show)
  .patch(validateBodyWithToken(updateRequest), designationController.edit)
  .delete(validateToken(), designationController.delete);

module.exports = router;
