const express = require('express');
const router = express.Router();
const roomController = require('../../../../../app/http/Controller/setting/room.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/setting/room.validator');

router.get('/search', validateToken(), roomController.search);
router.get('/all', validateToken(), roomController.all);

router
  .route('/')
  .get(validateToken(), roomController.getAll)
  .post(validateBodyWithToken(createRequest), roomController.create);

router
  .route('/:id')
  .get(validateToken(), roomController.show)
  .patch(validateBodyWithToken(updateRequest), roomController.edit)
  .delete(validateToken(), roomController.delete);

module.exports = router;
