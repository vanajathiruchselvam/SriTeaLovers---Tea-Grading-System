'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  date: Joi.date().required(),
  hotel_id: Joi.number().required(),
  customer_id: Joi.number().required(),
  rooms: Joi.array()
    .items(
      Joi.object({
        room_id: Joi.number().required(),
        check_in: Joi.date().required(),
        check_out: Joi.date().required(),
        amount: Joi.number().required(),
        adults: Joi.number().required(),
        child: Joi.number().required(),
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
