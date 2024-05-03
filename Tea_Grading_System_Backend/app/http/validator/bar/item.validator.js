'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  name: Joi.string().required(),
  purchasing_price: Joi.number().required(),
  selling_price: Joi.number().required(),
  reorder_level: Joi.number().required(),
  available_stock: Joi.number().required(),
  damage: Joi.number().required(),
}).options({ abortEarly: false });

const updateRequest = Joi.object({
  name: Joi.string().required(),
  purchasing_price: Joi.number().required(),
  selling_price: Joi.number().required(),
  reorder_level: Joi.number().required(),
  available_stock: Joi.number().required(),
  damage: Joi.number().required(),
}).options({ abortEarly: false });

module.exports.createRequest = createRequest;
module.exports.updateRequest = updateRequest;
