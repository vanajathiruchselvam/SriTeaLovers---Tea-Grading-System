'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  is_smoking: Joi.boolean().required(),
  remarks: Joi.string().allow('', null),
  price: Joi.number().required(),
  floor_id: Joi.number().required(),
  room_type_id: Joi.number().required(),
  hotel_id : Joi.number().required(),
}).options({ abortEarly: false });

const updateRequest = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  is_smoking: Joi.boolean().required(),
  remarks: Joi.string().allow('', null),
  price: Joi.number().required(),
  floor_id: Joi.number().required(),
  room_type_id: Joi.number().required(),
  hotel_id : Joi.number().required(),
}).options({ abortEarly: false });

module.exports.createRequest = createRequest;
module.exports.updateRequest = updateRequest;
