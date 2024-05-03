const express = require('express');
const router = express.Router();
const leaveController = require('../../../../../app/http/Controller/leave/leave.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  changeStatusRequest,
} = require('../../../../../app/http/validator/leave/leave.validator');

router
  .route('/')
  .get(validateToken(), leaveController.getAll)
  .post(validateBodyWithToken(createRequest), leaveController.create);

router.route('/:id').get(validateToken(), leaveController.show);

router
  .route('/:id/change-status')
  .patch(
    validateBodyWithToken(changeStatusRequest),
    leaveController.changeStatus
  );
module.exports = router;
