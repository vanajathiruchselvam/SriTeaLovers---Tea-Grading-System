'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  from_date: Joi.date().required(),
  to_date: Joi.date().required(),
  reason: Joi.string().required(),
  staff_id: Joi.number().required(),
  approver_id: Joi.number().required(),
}).options({ abortEarly: false });

const changeStatusRequest = Joi.object({
  status: Joi.string().valid('Approved', 'Rejected', 'Cancelled').required(),
}).options({ abortEarly: false });

module.exports.changeStatusRequest = changeStatusRequest;
module.exports.createRequest = createRequest;
