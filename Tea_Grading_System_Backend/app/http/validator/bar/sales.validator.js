'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  date: Joi.date().required(),
  customer_id: Joi.number().required(),
  items: Joi.array()
    .items(
      Joi.object({
        quantity: Joi.number().required(),
        amount: Joi.number().required(),
        items_id: Joi.number().required(),
      })
    )
    .required(),
}).options({ abortEarly: false });

const paymentRequest = Joi.object({
  payment_method: Joi.string()
    .valid('Cash', 'Cheque', 'Credit Card')
    .required()
    .required(),
  paid_amount: Joi.number().required(),
}).options({ abortEarly: false });

module.exports.createRequest = createRequest;
module.exports.paymentRequest = paymentRequest;
