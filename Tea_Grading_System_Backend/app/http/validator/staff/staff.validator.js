'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  date_of_birth: Joi.date().required(),
  mobile: Joi.string().required(),
  email: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  salary: Joi.number().allow('', null),
  monthly_overtime: Joi.number().required(),
  overtime_amount: Joi.number().required(),
  travelling_allowance: Joi.number().allow('', null),
  designation_id: Joi.number().required(),
  hotel_id: Joi.number().required(),
}).options({ abortEarly: false });

const updateRequest = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  date_of_birth: Joi.date().required(),
  mobile: Joi.string().required(),
  email: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  salary: Joi.number().allow('', null),
  monthly_overtime: Joi.number().required(),
  overtime_amount: Joi.number().required(),
  travelling_allowance: Joi.number().allow('', null),
  designation_id: Joi.number().required(),
  hotel_id: Joi.number().required(),
}).options({ abortEarly: false });

module.exports.createRequest = createRequest;
module.exports.updateRequest = updateRequest;
