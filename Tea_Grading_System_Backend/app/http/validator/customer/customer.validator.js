'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  full_name: Joi.string().required(),
  nic_number: Joi.string().required(),
  passport_number: Joi.string(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  company: Joi.string(),
}).options({ abortEarly: false });

const updateRequest = Joi.object({
  full_name: Joi.string().required(),
  nic_number: Joi.string().required(),
  passport_number: Joi.string(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  company: Joi.string(),
}).options({ abortEarly: false });

module.exports.createRequest = createRequest;
module.exports.updateRequest = updateRequest;
